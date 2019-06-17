// @login & register

const express = require('express');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
var jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const User = require('../../models/User');
const keys = require('../../config/keys');


/**
 * $route GET api/users/test
 * @desc return json data
 * @ assess publish
 */
router.get('/test', (req, res) => {
  res.json({
    msg: 'success'
  });
})


/**
 * $route POST api/users/register
 * @desc return json data
 * @ assess publish
 */
router.post('/register', (req, res) => {
  console.log(req.body)
  const { email, name, password, role } = req.body;
  // 查询数据库邮箱是否存在
  User.findOne({email: req.body.email})
      .then((user) => {
        if (user) {
          return res.json({
            code: 500,
            success: false,
            error: '邮箱已被注册'
          });
        }
        // 头像设置
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
        const newUser = new User({
          email,
          name,
          avatar,
          password,
          role,
        });
        // 密码加密
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;
            newUser.save()
                   .then((user) => {
                     res.json({
                       success: true,
                       result: user
                     });
                   })
                   .catch(err => console.log(err));
          });
        });
      })
});

/**
 * $route POST api/users/login
 * @desc return token
 * @ assess publish
 * 
 * jwt passport
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // 查询数据库用户是否存在
  User.findOne({email}).then((user) => {
    if (!user) {
      return res.json({
        code: 500,
        success: false,
        error: '用户不存在'
      });
    }
    // 对密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const { id, name, email, role, avatar } = user;
        const rule = {
          id, name, email, role, avatar,
        }
        // 设置token
        // jwt.sign(规则, secret, 过期时间, 回调函数）
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 36000 }, (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        });
      } else {
        return res.json({
          success: false,
          error: '密码错误'
        })
      }
    })
  })
});


/**
 * $route GET api/users/current
 * @desc return cur user
 * @ assess private 私密的
 * 
 * jwt passport
 */
// router.get('/current', "验证token", 回调)
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { email, name, avatar, date, role } = req.user;
  res.json({
    email,
    name,
    avatar,
    date,
    role,
  });
});

module.exports = router;