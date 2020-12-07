<template>
  <v-dialog
    v-model="visible"
    max-width="500px"
    no-click-animation
    persistent
  >
    <v-form
      class="modal-primary"
      @submit.prevent="register"
    >
      <div class="modal-primary__header">
        <span>Авторизация</span>
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__content">
          <v-text-field
            v-model="form.name"
            label="Наименование организации"
            :error-messages="(errors.find(e => e.path === 'name') || defaultErr).details"
            outlined
            focused
          />
          <v-text-field
            v-model="form.inn"
            label="ИНН"
            :error-messages="(errors.find(e => e.path === 'inn') || defaultErr).details"
            outlined
            focused
          />
          <v-text-field
            v-model="form.kpp"
            label="КПП"
            :error-messages="(errors.find(e => e.path === 'kpp') || defaultErr).details"
            outlined
            focused
          />
          <v-text-field
            v-model="form.firstName"
            label="Имя пользователя"
            :error-messages="(errors.find(e => e.path === 'firstName') || defaultErr).details"
            outlined
            focused
          />
          <v-text-field
            v-model="form.lastName"
            label="Фамилия пользователя"
            :error-messages="(errors.find(e => e.path === 'lastName') || defaultErr).details"
            outlined
            focused
          />
          <v-text-field
            v-model="form.email"
            label="E-mail"
            type="email"
            :error-messages="(errors.find(e => e.path === 'email') || defaultErr).details"
            outlined
            focused
          />
          <v-text-field
            v-model="form.password"
            label="Пароль"
            type="password"
            :error-messages="(errors.find(e => e.path === 'password') || defaultErr).details"
            outlined
            @input="errors = []"
          />
        </div>
        <div class="modal-primary__actions pt-0 justify-space-between">
          <v-btn
            class="ml-2"
            depressed
            @click="$router.push('/auth')"
          >
            ← Войти
          </v-btn>
          <v-btn
            class="ml-2"
            depressed
            @click="test"
          >
            тест
          </v-btn>
          <v-btn
            class="ml-2"
            depressed
            color="primary"
            type="submit"
          >
            Зарегистрировать
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
import APIauthLogin from 'api/authLogin';
import { loginAndRedirect } from 'api/helpers';

export default {
  name: 'RegistrationModal',
  data: () => ({
    defaultErr: {
      details: null,
    },
    errors: [],
    form: {
      name: '',
      inn: '',
      kpp: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    visible: true,
  }),
  methods: {
    register() {
      this.$http.post('auth/register', this.form).then(async () => {
        await APIauthLogin({
          email: this.form.email,
          password: this.form.password,
        }).then(async (response) => {
          await loginAndRedirect(response);
          this.visible = false;
        });
      }).catch((e) => {
        try {
          this.errors = e.response.data.errors;
        } catch (err) {
          console.error(e); // eslint-disable-line
          console.error(err); // eslint-disable-line
        }
      });
    },
    test() {
      this.form = {
        name: 'test',
        inn: '1234567890',
        kpp: '420930130',
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.test',
        password: 'тест',
      };
    },
  },
};
</script>
