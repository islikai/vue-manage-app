import axios from 'axios';
import { Loading, Message } from 'element-ui';

import router from './router';

let loading = {};
// 开始加载动画
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  });
}
// 结束加载动画
function endLoading() {
  loading.close();
}

// 请求拦截
axios.interceptors.request.use((req) => {
  startLoading();
  // 判断Token是否存在, 如果存在设置请求头
  if (localStorage.Token) {
    req.headers.Authorization = localStorage.Token;
  }
  if (req.params) {
    // 请求添加时间戳
    req.params.timestamp = new Date().getTime();
  }
  return req;
}, (err) => {
  endLoading();
  Message.error(err);
  return Promise.reject(err);
});

// 响应拦截
axios.interceptors.response.use((res) => {
  endLoading();
  return res.data;
}, (err) => {
  endLoading();
  Message.error(err);
  // 获取状态码是否为401
  const { status } = err.response;
  if (status === 401) {
    Message.error('token失效，请重新登录');
    // 清除token
    localStorage.removeItem('Token');
    // 跳转到登录页面
    router.push('login');
  }
  return Promise.reject(err);
});


export default axios;
