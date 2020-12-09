<template>
  <v-dialog
    v-model="visible"
    max-width="500px"
    no-click-animation
    persistent
  >
    <v-form
      autocomplete="off"
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
            autocomplete="nope"
            label="Наименование организации"
            :error-messages="errMessagesHandler('name')"
            outlined
            focused
            :rules="rules.name"
            @input="errors = []"
          />
          <v-text-field
            ref="inn"
            v-model="form.inn"
            :counter="INN_MAX_LENGTH"
            label="ИНН"
            :error-messages="errMessagesHandler('inn')"
            :rules="rules.inn"
            outlined
            @input="errors = []"
          />
          <v-text-field
            ref="kpp"
            v-model="form.kpp"
            :counter="KPP_MAX_LENGTH"
            label="КПП"
            :error-messages="errMessagesHandler('kpp')"
            :rules="rules.kpp"
            outlined
            @input="errors = []"
          />
          <v-text-field
            ref="firstName"
            v-model="form.firstName"
            autocomplete="nope"
            label="Имя пользователя"
            :error-messages="errMessagesHandler('firstName')"
            :rules="rules.firstName"
            outlined
            @input="errors = []"
          />
          <v-text-field
            ref="lastName"
            v-model="form.lastName"
            autocomplete="nope"
            label="Фамилия пользователя"
            :error-messages="errMessagesHandler('lastName')"
            :rules="rules.lastName"
            outlined
            @input="errors = []"
          />
          <v-text-field
            ref="email"
            v-model="form.email"
            autocomplete="nope"
            label="E-mail"
            type="email"
            :error-messages="errMessagesHandler('email')"
            :rules="rules.email"
            outlined
            @input="errors = []"
          />
          <v-text-field
            ref="password"
            v-model="form.password"
            autocomplete="new-password"
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
            color="primary"
            depressed
            :loading="loading"
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
import { alpha, inn, kpp } from '@/utilities/validators';

const STRING_MAX_LENGTH = 255;
const INN_MAX_LENGTH = 12;
const KPP_MAX_LENGTH = 9;
const PASSWORD_MAX_LENGTH = 64;

export default {
  name: 'RegistrationModal',
  data: () => ({
    errors: [],
    loading: false,
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
      inn: [required, numeric, minLength(10), maxLength(12), inn],
      kpp: [required, numeric, minLength(9), maxLength(9), kpp],
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
      inn: { required, numeric, minLength: minLength(10), maxLength: maxLength(INN_MAX_LENGTH), inn },
      kpp: { required, numeric, minLength: minLength(9), maxLength: maxLength(KPP_MAX_LENGTH), kpp },
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
      if (!field) return null;

      const apiErr = this.errors.find((e) => e.path === fieldName);

      if (apiErr) {
        return apiErr.details;
      }

      if (field.hasFocused) {
        return this.$errorMessage(this.$v, `form.${fieldName}`);
      }

      return null;
    },
    register() {
      if (this.loading) throw Error('response already loading!');

      this.loading = true;
      this.$http.post('auth/register', this.form).then(() => {
        this.visible = false;
        redirectToAuth();
      }).catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          this.errors = e.response.data.errors;
          this.$forceUpdate();
        } else {
          console.error(e); // eslint-disable-line
        }
      }).finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>
