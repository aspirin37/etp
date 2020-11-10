<template>
  <v-app id="app">
    <auth-panel />
    <app-sidebar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AuthPanel from '@/components/layout/AuthPanelTemp.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';

export default {
  name: 'App',
  components: {
    AuthPanel,
    AppSidebar,
  },
};
</script>
