import Vue from 'vue';
import VueMoment from 'vue-moment';
import Vuelidate from 'vuelidate';
import VueCurrencyInput from 'vue-currency-input';
import Http from 'api';
import { get } from 'lodash-es';
import { getFormErrorMessage } from './plugins/vuelidate-errors';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import toCurrency from './utilities/to-currency';
import currencyOptions from './utilities/currency-options';

import '@/assets/styles/index.scss';

Vue.use(VueMoment);
Vue.use(Vuelidate);
Vue.use(VueCurrencyInput, currencyOptions);

Vue.filter('toCurrency', toCurrency);

Vue.config.productionTip = false;
Vue.prototype.$errorMessage = ($v, field) => getFormErrorMessage($v, field);
Vue.prototype.$http = Http;
Vue.prototype.$get = get;

const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

export default app;
