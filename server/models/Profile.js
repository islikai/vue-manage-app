const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 创建Scheam
const ProfileScheam = new Schema({
  type: {
    type: String,
  },
  desc: {
    type: String,
    required: true,
  },
  income: {
    type: String,
    required: true,
  },
  expend: {
    type: String,
    required: true,
  },
  cash: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileScheam);