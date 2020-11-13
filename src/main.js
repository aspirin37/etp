import Vue from 'vue';
import VueMoment from 'vue-moment';
import Vuelidate from 'vuelidate';
import VueCurrencyInput from 'vue-currency-input';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import http from './api/axios-config';

import '@/assets/styles/index.scss';

Vue.use(VueMoment);
Vue.use(Vuelidate);

const currencyOptions = {
  globalOptions: {
    currency: null,
    locale: 'ru',
    allowNegative: false,
    distractionFree: false,
  },
};

Vue.use(VueCurrencyInput, currencyOptions);

Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
