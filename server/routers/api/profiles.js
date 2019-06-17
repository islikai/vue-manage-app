
// @login & register

const express = require('express');
const passport = require('passport');

const Profile = require('../../models/Profile');

const router = express.Router();


/**
 * $route GET api/profile/test
 * @desc return json data
 * @ assess publish
 */
router.get('/test', (req, res) => {
  res.json({ msg: 'success' });
})


/**
 * @desc 创建
 * @router POST api/profiles/create
 * @access Private
 */
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { type, desc, income, expend, cash, remark } = req.body;
  const profileFields = {
    type, desc, income, expend, cash, remark,
  }
  new Profile(profileFields).save().then(profile => {
    res.json(profile);
  })
})

/**
 * @desc 创建
 * @router POST api/profiles/update/:id
 * @access Private
 */
router.post('/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { type, desc, income, expend, cash, remark } = req.body;
  const profileFields = {
    type, desc, income, expend, cash, remark,
  }
  Profile.findOneAndUpdate(
    { _id: req.params.id },
    { $set: profileFields },
    { new: true },
  ).then(profile => {
    res.json(profile);
  }).catch(err => {
    res.status(404).json(err);
  })
})

/**
 * @desc 删除
 * @router POST api/profiles/delete/:id
 * @access Private
 */
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { type, desc, income, expend, cash, remark } = req.body;
  const profileFields = {
    type, desc, income, expend, cash, remark,
  }
  Profile.findOneAndRemove(
    { _id: req.params.id },
  ).then(profile => {
    profile.save().then( result => {
      res.json(result);
    })
  }).catch(err => {
    res.status(404).json({ msg: '删除失败' });
  })
})


/**
 * @desc 获取列表数据
 * @router POST api/profiles/query
 * @access Private
 */
router.get('/query', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { startDate, endDate, pageNo, pageSize } = req.query;
  const filterData = startDate ? { 'date': { $gte: startDate, $lte: endDate } } : {};
  Profile.find({}).then((doce) => {
    Profile.find(filterData).skip((pageNo - 1) * pageSize).limit(Number(pageSize)).then(profile => {
      if (!profile) {
        return res.json({
          error: '查询错误',
          success: false,
          result: profile,
        });
      }
      res.json({
        success: true,
        result: profile,
        total: doce.length,
      });
    })
  }).catch(err => {
    res.status(404).json(err);
  });
})


/**
 * @desc 获取单条数据
 * @router POST api/profiles/query/:id
 * @access Private
 */
router.get('/query/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({_id: req.params.id})
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ msg: '没有内容' });
      }
      res.json(profile);
    })
    .catch(err => {
      res.status(404).json(err);
    })
})


module.exports = router;