<template>
  <div>
    <auth-modal
      v-if="authModal"
      v-model="authModal"
    />
    <v-app-bar
      clipped-left
      elevation="0"
      height="68"
      class="auth"
      color="dark"
      app
    >
      <template v-if="user">
        <span class="white--text ml-auto mr-4">
          {{ user.tenant_name || user.user_name }}
        </span>
        <v-btn
          color="accent"
          @click="signOut"
        >
          Выйти
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          class="ml-auto mr-4"
          depressed="depressed"
          color="accent"
          @click="authModal = true"
        >
          Войти
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import AuthModal from '@/components/modals/AuthModal.vue';
import { mapState } from 'vuex';

export default {
  name: 'AuthPanel',
  components: {
    AuthModal,
  },
  data() {
    return {
      authModal: false,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    signOut() {
      this.$store.commit('signOut');
      this.$router.push('/');
    },
  },
};
</script>

<style>

</style>
