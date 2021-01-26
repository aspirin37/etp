<template>
  <v-dialog
    v-model="visible"
    max-width="620px"
  >
    <okpd2-modal
      v-model="okpd2ModalVisible"
      @submit="position.okpd2 = $event"
    />
    <v-form
      ref="form"
      class="modal-primary"
      @submit.prevent="onSubmit"
    >
      <div class="modal-primary__header">
        <span>Новая позиция</span>
        <v-btn
          icon
          dark
          @click="visible = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__content">
          <v-text-field
            v-model.trim="position.name"
            :error-messages="nameErrors"
            :counter="nameMaxLength"
            class="required"
            label="Наименование позиции контрагента"
            outlined
          />
          <v-text-field
            class="required"
            :value="okpd2WithCode"
            :error-messages="okpd2Errors"
            append-icon="mdi-reorder"
            label="ОКПД2"
            required
            outlined
            readonly
            @focus="okpd2ModalVisible = true"
          />
          <okei-autocomplete
            v-model="position.okei"
            :error-messages="okeiErrors"
            class="required"
            outlined
          />
          <v-textarea
            v-model.trim="position.specifications"
            label="Характеристики"
            hide-details="hide-details"
            outlined="outlined"
          />
        </div>
        <div class="modal-primary__actions">
          <v-btn
            class="ml-auto"
            depressed="depressed"
            @click="visible = false"
          >
            Отмена
          </v-btn>
          <v-btn
            class="ml-2"
            depressed="depressed"
            color="primary"
            type="submit"
          >
            Сохранить
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import OkeiAutocomplete from '@/components/OkeiAutocomplete.vue';
import Okpd2Modal from '@/components/modals/Okpd2Modal.vue';

export default {
  name: 'ManualUserPositionModal',
  components: {
    Okpd2Modal,
    OkeiAutocomplete,
  },
  props: {
    value: {
      type: Boolean,
    },
    positionEdited: {
      type: Object,
    },
  },
  data: () => ({
    okpd2ModalVisible: false,
    okeiList: [],
    name: '',
    position: {
      id: '',
      name: '',
      specifications: '',
      okpd2: {
        id: '',
        name: '',
        code: '',
      },
      okei: {
        id: '',
        name: '',
      },
    },
    formSubmitted: false,
    nameMinLength: 3,
    nameMaxLength: 1000,
    modalTransitionDuration: 300,
  }),
  validations() {
    return {
      position: {
        name: {
          required,
          minLength: minLength(this.nameMinLength),
          maxLength: maxLength(this.nameMaxLength),
        },
        okpd2: {
          name: {
            required,
          },
        },
        okei: {
          name: {
            required,
          },
        },
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
    okpd2WithCode() {
      if (this.position.okpd2 && this.position.okpd2.code) {
        return `${this.position.okpd2.code} -- ${this.position.okpd2.name}`;
      }
      return '';
    },
    nameErrors() {
      const errors = [];
      if (!this.formSubmitted) {
        return errors;
      }
      if (!this.$v.position.name.required) {
        errors.push('Обязательное поле');
      }
      if (!this.$v.position.name.minLength) {
        errors.push(`Название должно содержать как минимум ${this.nameMinLength} символа`);
      }
      if (!this.$v.position.name.maxLength) {
        errors.push(`Название не должно превышать ${this.nameMaxLength} символов`);
      }

      return errors;
    },
    okpd2Errors() {
      const errors = [];
      if (!this.formSubmitted) {
        return errors;
      }
      if (!this.$v.position.okpd2.name.required) {
        errors.push('Обязательное поле');
      }
      return errors;
    },
    okeiErrors() {
      const errors = [];
      if (!this.formSubmitted) {
        return errors;
      }
      if (!this.$v.position.okei.name.required) {
        errors.push('Обязательное поле');
      }
      return errors;
    },
  },
  created() {
    if (this.positionEdited) {
      this.position = this.positionEdited;
    }
  },
  methods: {
    async onSubmit() {
      this.formSubmitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.$emit('submit', this.position);
    },
  },
};
</script>
