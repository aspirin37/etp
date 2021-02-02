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
        <div class="modal-primary__actions pt-0 justify-space-between">
          <!-- <v-btn
            class="ml-auto"
            depressed="depressed"
            @click="visible = false"
          >
            Отмена
          </v-btn> -->
          <v-btn
            class="ml-2"
            color="primary"
            depressed
            :loading="loading"
            type="submit"
          >
            Войти
          </v-btn>
          <v-btn
            class="ml-2"
            depressed
            @click="$router.push('/registration')"
          >
            Регистрация
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
import APIauthLogin from '@/api/authLogin';
import { loginAndRedirect } from '@/api/helpers';

export default {
  name: 'AuthModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    errors: [],
    credentials: {
      email: '',
      password: '',
    },
    loading: false,
  }),
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
    signIn() {
      if (this.loading) throw Error('response already loading!');

      this.loading = true;
      APIauthLogin(this.credentials).then((response) => {
        loginAndRedirect(response);
        this.visible = false;
      }).catch((e) => {
        this.errors = e.response?.data.errors;
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style>

</style>
