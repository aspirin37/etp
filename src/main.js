import Vue from 'vue';
import VueMoment from 'vue-moment';
import SvgIcon from '@/components/common/SvgIcon.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import http from './api/axios-config';

import '@/assets/styles/index.scss';

Vue.use(VueMoment);

Vue.component('svg-icon', SvgIcon);

Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
