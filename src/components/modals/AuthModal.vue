<template>
  <v-dialog
    v-model="visible"
    max-width="500px"
    no-click-animation
    persistent
  >
    <v-form
      class="modal-primary"
      @submit.prevent="signIn"
    >
      <div class="modal-primary__header">
        <span>Авторизация</span>
        <!-- <v-btn
          icon
          dark
          @click="visible = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn> -->
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__content">
          <v-text-field
            v-model="credentials.email"
            label="E-mail"
            type="user"
            outlined
            focused
          />
          <v-text-field
            v-model="credentials.password"
            label="Пароль"
            type="password"
            :error-messages="errors"
            outlined
            @input="errors = []"
          />
        </div>
        <div class="modal-primary__actions pt-0">
          <!-- <v-btn
            class="ml-auto"
            depressed="depressed"
            @click="visible = false"
          >
            Отмена
          </v-btn> -->
          <v-btn
            class="ml-2"
            depressed="depressed"
            color="primary"
            type="submit"
          >
            Войти
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: 'AuthModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      errors: [],
      credentials: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

      return JSON.parse(jsonPayload);
    },
    signIn() {
      this.$http.post('auth/login', this.credentials).then(async (response) => {
        const jwt = response.data.token;
        const userData = this.parseJwt(jwt);

        this.$http.defaults.headers.authorization = `Bearer ${jwt}`;
        localStorage.setItem('jwt', jwt);
        await this.$store.commit('setUser', userData);

        this.visible = false;
        this.$router.push('/price-requests/outbox');
      }).catch((e) => {
        this.errors = e.response.data.errors;
      });
    },
  },
};
</script>

<style>

</style>
