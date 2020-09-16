<template>
  <v-dialog
    v-model="visible"
    max-width="620px"
  >
    <okpd2-modal
      v-model="okpd2ModalVisible"
      @submit="onOkpd2Select"
    />
    <v-form
      ref="form"
      class="modal-primary"
      @submit.prevent="onSubmit"
    >
      <div class="modal-primary__header">
        <span>Новая позиция</span>
        <v-btn
          icon="icon"
          dark="dark"
          @click="onClose"
        >
          <v-icon>close</v-icon>
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
            @input="$v.position.name.$touch()"
            @blur="$v.position.name.$touch()"
          />
          <v-text-field
            class="required"
            :value="okpd2WithCode"
            :error-messages="okpd2Errors"
            append-icon="reorder"
            label="ОКПД2"
            required
            outlined
            readonly
            @focus="okpd2ModalVisible = true"
          />
          <v-row>
            <v-col
              cols="6"
              class="py-0"
            >
              <v-text-field
                v-model.trim.number="position.quantity"
                label="Количество"
                type="number"
                :min="1"
                :max="1000"
                outlined
              />
            </v-col>
            <v-col
              cols="6"
              class="py-0"
            >
              <okei-autocomplete
                v-model="position.okei"
                outlined
              />
            </v-col>
          </v-row>
          <v-textarea
            v-model.trim="position.description"
            label="Комментарий"
            hide-details="hide-details"
            outlined="outlined"
          />
        </div>
        <div class="modal-primary__actions">
          <v-btn
            class="ml-auto"
            depressed="depressed"
            @click="onClose"
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
import { required, maxLength } from 'vuelidate/lib/validators';

import OkeiAutocomplete from '@/components/OkeiAutocomplete.vue';
import Okpd2Modal from '@/components/modals/Okpd2Modal.vue';

export default {
  name: 'WizardPositionModal',
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
      description: '',
      okpd2: {
        id: '',
        name: '',
        code: '',
      },
      okei: {
        id: '',
        fullName: '',
      },
      quantity: null,
    },
    nameMaxLength: 1000,
    modalTransitionDuration: 300,
  }),
  validations() {
    return {
      position: {
        name: {
          required,
          maxLength: maxLength(this.nameMaxLength),
        },
        okpd2: {
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
      if (this.position.okpd2.code) {
        return `${this.position.okpd2.code} -- ${this.position.okpd2.name}`;
      }
      return '';
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.position.name.$dirty) {
        return errors;
      }

      if (!this.$v.position.name.required) {
        errors.push('Обязательное поле');
      }

      if (!this.$v.position.name.maxLength) {
        errors.push(`Название не должно превышать ${this.nameMaxLength} символов`);
      }

      return errors;
    },
    okpd2Errors() {
      const errors = [];
      if (!this.$v.position.okpd2.name.$dirty) {
        return errors;
      }

      if (!this.$v.position.okpd2.name.required) {
        errors.push('Обязательное поле');
      }

      return errors;
    },
  },
  watch: {
    positionEdited(value) {
      if (value) {
        this.position = JSON.parse(JSON.stringify(value));
      }
    },
  },
  methods: {
    reset() {
      setTimeout(() => {
        this.$v.$reset();
        this.position = {
          id: '',
          name: '',
          description: '',
          okpd2: {
            id: '',
            name: '',
            code: '',
          },
          okei: {
            id: '',
            fullName: '',
          },
          quantity: null,
        };
      }, this.modalTransitionDuration);
    },
    onClose() {
      this.reset();
      this.visible = false;
    },
    async onSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.$emit('submit', this.position);
      this.reset();
    },
    onOkpd2Select(item) {
      this.position.okpd2 = item;
      this.$v.position.okpd2.name.$touch();
    },
  },
};
</script>
