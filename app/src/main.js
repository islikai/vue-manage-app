import Vue from 'vue';
import ElementUI from 'element-ui';
import VCharts from 'v-charts';
import moment from 'moment';
import axios from './http';
import App from './App.vue';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VCharts);

Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
