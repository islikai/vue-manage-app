import Vue from 'vue';
import Router from 'vue-router';

import Index from './views/Index.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import AccountInfo from './views/AccountInfo.vue';
import AccountList from './views/AccountList.vue';

import Nofound from './components/404.vue';


Vue.use(Router);

const routers = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: 'home', component: Home },
        { path: 'account', component: AccountInfo },
        { path: 'list', component: AccountList },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '*',
      name: 'nofound',
      component: Nofound,
    },
  ],
});

/**
 * 路由守卫
 */

routers.beforeEach((to, from, next) => {
  // 判断是否登录
  const isLogin = localStorage.Token || false;
  if (to.path === '/login' || to.path === '/register') {
    next();
  }
  // 未登录跳转登录页进行登录
  if (isLogin) {
    next();
  } else {
    (to.path === '/login' || to.path === '/register') ? (
      next()
    ) : (
      next('/login')
    );
  }
});

export default routers;
