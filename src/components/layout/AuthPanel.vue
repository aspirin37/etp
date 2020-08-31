<template>
  <v-app-bar
    clipped-left
    elevation="0"
    height="68"
    class="auth"
    app
  >
    <div
      id="panel"
      class="auth__panel"
    />
  </v-app-bar>
</template>

<script>

// Документация по панели
// https://conf.etpgpb.ru/pages/viewpage.action?pageId=42043350

export default {
  name: 'AuthPanel',
  mounted() {
    const s = document.createElement('script');
    const bs = document.getElementsByTagName('script')[0];

    s.async = true;
    s.src = '//sdn-test.etpgpb.ru/widgets/auth-panel/js/app.js';
    s.onerror = () => {
      // Действия в случае недоступности cdn
    };

    window.EtpElk = [];

    window.EtpElk.push(['init', {
      clientId: 'tradeportal',
      containerId: 'panel',
      isHelpVisible: true,
      isSystemInfoVisible: true,
      isAuthButtonsVisible: true,
      locale: 'ru',
      registrationLink: 'https://passport-sso.etpgpb.ru/sign_up',
      menu: [
        { type: 'text', value: 'Техподдержка' },
        { type: 'phone', value: '8 800 100-66-22' },
        { type: 'text', value: 'Сопровождение' },
        { type: 'phone', value: '7 495 150-06-61' },
      ],
    }]);

    window.EtpElk.push(['subscribe', 'data.user.authed', (data) => {
      this.$store.commit('setUser', data);
    }]);

    window.EtpElk.push(['subscribe', 'data.user.not-authed', () => {
      this.$store.commit('setUser', null);
    }]);

    if (bs?.parentNode) {
      bs.parentNode.insertBefore(s, bs);
    } else {
      document.body.appendChild(s);
    }
  },
};
</script>

<style lang="scss">
  .auth {
    &__panel {
      width: 100%;
    }

    &:not(:empty) + * {
      min-height: calc(100vh - 68px) !important;
    }

    .v-toolbar__content {
      padding: 0 !important;
    }

    .elk-1xjdFV0 {
      margin: 0 50px;
    }
  }
</style>
