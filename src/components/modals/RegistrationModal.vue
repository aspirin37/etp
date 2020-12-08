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
        <span>Регистрация</span>
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__content">
          <v-text-field
            v-model="form.name"
            label="Наименование организации"
            :error-messages="/* $get($v.form.name, '$error') || */errors.name"
            outlined
            focused
            :rules="rules.name"
          />
          <v-text-field
            v-model="form.inn"
            :counter="INN_MAX_LENGTH"
            label="ИНН"
            :error-messages="/* $v.form.inn.$error || */errors.inn"
            :rules="rules.inn"
            outlined
          />
          <v-text-field
            v-model="form.kpp"
            :counter="KPP_MAX_LENGTH"
            label="КПП"
            :error-messages="/* $v.form.kpp.$error */null"
            :rules="rules.kpp"
            outlined
          />
          <v-text-field
            v-model="form.firstName"
            label="Имя пользователя"
            :error-messages="/* $v.form.firstName.$error */null"
            :rules="rules.firstName"
            outlined
          />
          <v-text-field
            v-model="form.lastName"
            label="Фамилия пользователя"
            :error-messages="/* $v.form.lastName.$error */null"
            :rules="rules.lastName"
            outlined
          />
          <v-text-field
            v-model="form.email"
            label="E-mail"
            type="email"
            :error-messages="/* $v.form.email.$error */null"
            :rules="rules.email"
            outlined
          />
          <v-text-field
            v-model="form.password"
            :counter="PASSWORD_MAX_LENGTH"
            label="Пароль"
            type="password"
            :error-messages="/* $v.form.password.$error */null"
            :rules="rules.password"
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
import { redirectToAuth } from 'api/helpers';
import {
  alpha,
  email,
  minLength,
  maxLength,
  numeric,
  required,
} from 'vuelidate/lib/validators';
import { random } from 'lodash-es';
// import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';

const Fields = ['name', 'inn', 'kpp', 'firstName', 'lastName', 'email', 'password'];

export default {
  name: 'RegistrationModal',
  // mixins: [singleErrorExtractorMixin],
  data: () => ({
    defaultErr: {
      details: null,
    },
    errors: Fields.reduce((acc, cur) => Object.assign(acc, { [cur]: null }), {}),
    form: {
      name: '',
      inn: '',
      kpp: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    rules: {
      name: [required, minLength(3), maxLength(255)],
      inn: [required, numeric, minLength(10), maxLength(12)],
      kpp: [required, numeric, minLength(9), maxLength(9)],
      firstName: [required, alpha, minLength(2), maxLength(255)],
      lastName: [required, alpha, minLength(2), maxLength(255)],
      email: [required, email, maxLength(255)],
      password: [required, minLength(6), maxLength(64)],
    },
    visible: true,
    INN_MAX_LENGTH: 12,
    KPP_MAX_LENGTH: 9,
    PASSWORD_MAX_LENGTH: 64,
  }),
  validations() {
    return {
      form: {
        name: [required, minLength(3), maxLength(255)],
        inn: [required, numeric, minLength(10), maxLength(this.INN_MAX_LENGTH)],
        kpp: [required, numeric, minLength(9), maxLength(this.KPP_MAX_LENGTH)],
        firstName: [required, alpha, minLength(2), maxLength(255)],
        lastName: [required, alpha, minLength(2), maxLength(255)],
        email: [required, email, maxLength(255)],
        password: [required, minLength(6), maxLength(this.PASSWORD_MAX_LENGTH)],
      },
    };
  },
  methods: {
    register() {
      this.$http.post('auth/register', this.form).then(() => {
        this.visible = false;
        redirectToAuth();
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
      const randomStr = (length) => Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, length);

      this.form = {
        name: 'test',
        inn: String(random(1000000000, 9999999999)),
        kpp: String(random(10000000, 999999999)),
        firstName: 'testFirstName',
        lastName: 'testLastName',
        email: `${randomStr(5)}@${randomStr(5)}.${randomStr(2)}`,
        password: 'testtest',
      };
    },
  },
};
</script>
