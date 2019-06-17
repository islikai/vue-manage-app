const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const db = require('./config/keys').mongoURI;
const users = require('./routers/api/users');
const profiles = require('./routers/api/profiles');

const port = process.env.PROT || 5000;

const app = express();

/**
 * 使用body-parser
 */
app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());


/**
 * 连结数据库
 */
mongoose.connect(db, { useNewUrlParser: true })
        .then(() => {
          console.log('MongoDB connected');
        })
        .catch((err) => {
          console.log(err);
        });

/**
 * 配置passport
 */
app.use(passport.initialize());
require('./config/passport')(passport);

/**
 * 配置路由
 */
app.use('/api/users', users);
app.use('/api/profiles', profiles);


app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});