import Vue from 'vue';
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar-ng';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon,
  },
});

Vue.use(VuetifyToast, {
  color: '',
  timeout: 5000,
  showClose: true,
  closeText: 'Закрыть',
  shorts: {
    success: {
      icon: 'check_circle',
      iconColor: 'success',
    },
    danger: {
      icon: 'error_outline',
      iconColor: 'red',
    },
  },
});

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#316DA4',
        accent: '#F69F39',
        grey: '#99A0A8',
        'light-grey': '#EEF2F5',
        teal: '#3194A4',
      },
    },
  },
  lang: {
    locales: { ru },
    current: 'ru',
  },
  icons: {
    iconfont: 'md',
  },
});
