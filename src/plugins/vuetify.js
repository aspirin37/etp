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
  y: 'top',
  closeText: 'Закрыть',
  shorts: {
    success: {
      icon: 'mdi-check-circle',
      iconColor: 'success',
    },
    danger: {
      icon: 'mdi-alert-circle-outline',
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
        dark: '#242f38',
      },
    },
  },
  lang: {
    locales: { ru },
    current: 'ru',
  },
});
