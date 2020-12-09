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
            ref="name"
            v-model="form.name"
            label="Наименование организации"
            :error-messages="errMessagesHandler('name')"
            outlined
            focused
            :rules="rules.name"
          />
          <v-text-field
            v-model="form.inn"
            :counter="INN_MAX_LENGTH"
            label="ИНН"
            :error-messages="errMessagesHandler('inn')"
            :rules="rules.inn"
            outlined
          />
          <v-text-field
            v-model="form.kpp"
            :counter="KPP_MAX_LENGTH"
            label="КПП"
            :error-messages="errMessagesHandler('kpp')"
            :rules="rules.kpp"
            outlined
          />
          <v-text-field
            v-model="form.firstName"
            label="Имя пользователя"
            :error-messages="errMessagesHandler('firstName')"
            :rules="rules.firstName"
            outlined
          />
          <v-text-field
            v-model="form.lastName"
            label="Фамилия пользователя"
            :error-messages="errMessagesHandler('lastName')"
            :rules="rules.lastName"
            outlined
          />
          <v-text-field
            v-model="form.email"
            label="E-mail"
            type="email"
            :error-messages="errMessagesHandler('email')"
            :rules="rules.email"
            outlined
          />
          <v-text-field
            v-model="form.password"
            :counter="PASSWORD_MAX_LENGTH"
            label="Пароль"
            type="password"
            :error-messages="errMessagesHandler('password')"
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
  email,
  minLength,
  maxLength,
  numeric,
  required,
} from 'vuelidate/lib/validators';
import { get, random } from 'lodash-es';
// import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';

const alpha = (v) => /[a-z\u0400-\u04FF]/.test(v);
const Fields = ['name', 'inn', 'kpp', 'firstName', 'lastName', 'email', 'password'];
const STRING_MAX_LENGTH = 255;
const INN_MAX_LENGTH = 12;
const KPP_MAX_LENGTH = 9;
const PASSWORD_MAX_LENGTH = 64;

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
      name: [required, minLength(3), maxLength(STRING_MAX_LENGTH)],
      inn: [required, numeric, minLength(10), maxLength(12)],
      kpp: [required, numeric, minLength(9), maxLength(9)],
      firstName: [required, alpha, minLength(2), maxLength(STRING_MAX_LENGTH)],
      lastName: [required, alpha, minLength(2), maxLength(STRING_MAX_LENGTH)],
      email: [required, email, maxLength(STRING_MAX_LENGTH)],
      password: [required, minLength(6), maxLength(64)],
    },
    visible: true,
    INN_MAX_LENGTH,
    KPP_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
  }),
  validations: {
    form: {
      /* eslint-disable object-curly-newline, max-len */
      name: { required, minLength: minLength(3), maxLength: maxLength(STRING_MAX_LENGTH) },
      inn: { required, numeric, minLength: minLength(10), maxLength: maxLength(INN_MAX_LENGTH) },
      kpp: { required, numeric, minLength: minLength(9), maxLength: maxLength(KPP_MAX_LENGTH) },
      firstName: { required, alpha, minLength: minLength(2), maxLength: maxLength(STRING_MAX_LENGTH) },
      lastName: { required, alpha, minLength: minLength(2), maxLength: maxLength(STRING_MAX_LENGTH) },
      email: { required, email, maxLength: maxLength(STRING_MAX_LENGTH) },
      password: { required, minLength: minLength(6), maxLength: maxLength(PASSWORD_MAX_LENGTH) },
      /* eslint-enable object-curly-newline, max-len */
    },
  },
  methods: {
    errMessagesHandler(fieldName) {
      const field = this.$refs[fieldName];
      if (!field || !field.hasFocused) return null;

      return this.$errorMessage(this.$v, `form.${fieldName}`) || get(this.errors.find(e => e.path === fieldName), 'details', null);
    },
    register() {
      this.$http.post('auth/register', this.form).then(() => {
        this.visible = false;
        redirectToAuth();
      }).catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          this.errors = e.response.data.errors;
        } else {
          console.error(e); // eslint-disable-line
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
