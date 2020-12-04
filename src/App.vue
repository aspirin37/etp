<template>
  <v-app id="app">
    <!-- <auth-panel /> -->
    <app-sidebar v-if="$route.name !== 'Auth' && user" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import AuthPanel from '@/components/layout/AuthPanelTemp.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    // AuthPanel,
    AppSidebar,
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>
