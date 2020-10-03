<template>
  <div class="page wizard">
    <div class="page__header">
      <h1 class="page__title">
        Создать ценовой запрос
      </h1>
    </div>
    <v-tabs
      v-model="tab"
      class="tabs-primary"
    >
      <v-tab
        v-for="(it, i) in tabs"
        :key="i"
        :disabled="it.disabled"
        :ripple="false"
      >
        <v-avatar size="20">
          <template v-if="it.validationStatus === 'not-validated'">
            {{ i + 1 }}
          </template>
          <v-icon
            v-else-if="it.validationStatus === 'valid'"
            color="success"
          >
            mdi-check-circle
          </v-icon>
          <v-icon
            v-else-if="it.validationStatus === 'invalid'"
            color="red"
          >
            mdi-alert-circle-outline
          </v-icon>
        </v-avatar>
        <span>{{ it.name }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="tab"
      class="wizard__content"
    >
      <v-tab-item>
        <v-card
          class="pa-8"
          flat="flat"
        >
          <div class="w-550">
            <v-text-field
              v-model="priceRequest.name"
              class="required"
              label="Наименование ЦЗ"
              outlined="outlined"
            />
            <v-text-field
              value="Стандартный ЦЗ"
              label="Тип ценового запроса"
              outlined="outlined"
              disabled="disabled"
            />
            <v-text-field
              v-model="priceRequest.customer"
              label="Заказчик"
              outlined="outlined"
              disabled="disabled"
            />
            <v-row>
              <v-col class="py-0">
                <v-text-field
                  v-model="priceRequest.inn"
                  label="ИНН"
                  outlined="outlined"
                  disabled="disabled"
                />
              </v-col>
              <v-col class="py-0">
                <v-text-field
                  v-model="priceRequest.kpp"
                  label="КПП"
                  outlined="outlined"
                  disabled="disabled"
                />
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          class="pa-0"
          flat="flat"
        >
          <position-table @input="onPositionsChange" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          class="pa-8"
          flat="flat"
        >
          <div class="w-550">
            <v-text-field
              v-model="priceRequest.delivery.address"
              class="required"
              :error-messages="deliveryAddressErrors"
              label="Адрес поставки"
              outlined="outlined"
            />
            <v-text-field
              v-model="priceRequest.delivery.conditions"
              class="required"
              :error-messages="deliveryConditionsErrors"
              label="Условия оплаты и поставки"
              outlined="outlined"
            />
            <v-row>
              <v-col
                class="py-0"
                cols="6"
              >
                <date-picker
                  v-model="priceRequest.delivery.date"
                  :error-messages="deliveryDateErrors"
                  :min="deliveryMinDate"
                  label="Дата поставки"
                  required="required"
                />
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          class="pa-8"
          flat="flat"
        >
          <div class="w-550">
            <div class="subtitle-2 mb-6">
              Требования к поставщику
            </div>
            <v-checkbox
              v-model="priceRequest.requirements.smallBusiness"
              class="mt-0 mb-2"
              label="Субъект малого и среднего предпринимательства"
              hide-details="hide-details"
            />
            <v-checkbox
              v-model="priceRequest.requirements.manufacturer"
              class="mt-0 mb-2"
              label="Производитель"
              hide-details="hide-details"
            />
            <v-checkbox
              v-model="priceRequest.requirements.authorizedDealer"
              class="mt-0 mb-10"
              label="Официальный дилер"
              hide-details="hide-details"
            />
            <div class="subtitle-2 mb-6">
              Требования к позициям
            </div>
            <v-checkbox
              v-model="priceRequest.requirements.russianProduction"
              class="mt-0 mb-10"
              label="Только товары российского производства"
              hide-details="hide-details"
            />
            <div class="subtitle-2 mb-6">
              Характеристики ЦЗ
            </div>
            <v-checkbox
              v-model="priceRequest.requirements.nationalProject"
              class="mt-0 mb-2"
              label="Закупка в рамках Национального проекта"
              hide-details="hide-details"
            />
            <v-checkbox
              v-model="priceRequest.requirements.privateRequest"
              class="mt-0 mb-10"
              label="Не отображать ЦЗ в открытых источниках"
              hide-details="hide-details"
            />
            <v-row>
              <v-col
                class="py-0"
                cols="8"
              >
                <date-picker
                  v-model="priceRequest.responseDate"
                  :error-messages="responseDateErrors"
                  label="Дата ответа на запрос"
                  :min="responseMinDate"
                  :max="responseMaxDate"
                />
              </v-col>
            </v-row>
            <v-textarea
              v-model="priceRequest.comment"
              label="Комментарий"
              hide-details="hide-details"
              outlined="outlined"
            />
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <div class="wizard__actions">
      <v-btn
        v-if="tab !== 0"
        class="mr-2"
        depressed="depressed"
        @click="tab--"
      >
        Назад
      </v-btn>
      <v-btn
        v-if="tab !== 3"
        class="mr-2"
        depressed="depressed"
        :disabled="nameNotValid"
        color="primary"
        @click="tab++"
      >
        Далее
      </v-btn>
      <v-btn
        class="ml-auto"
        type="submit"
        depressed="depressed"
        color="accent"
        :disabled="nameNotValid"
        @click.prevent="approveRequest"
      >
        Отправить ЦЗ поставщикам
      </v-btn>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import PriceRequestPositionTable from '@/components/PriceRequestPositionTable.vue';
import datePicker from '@/components/common/DatePicker.vue';

export default {
  name: 'CreatePriceRequest',
  components: {
    PositionTable: PriceRequestPositionTable,
    datePicker,
  },
  props: {
    id: String,
  },
  data: () => ({
    tab: 0,
    requestId: null,
    priceRequest: {
      name: '',
      type: 'STANDARD',
      customer: 'Вася',
      inn: '7731347089',
      kpp: '773101001',
      responseDate: null,
      comment: '',
      delivery: {
        address: '',
        conditions: '',
        date: null,
      },
      requirements: {
        smallBusiness: false,
        manufacturer: false,
        authorizedDealer: false,
        russianProduction: false,
        nationalProject: false,
        privateRequest: false,
      },
      lines: [],
    },
    successModal: false,
    errorModal: false,
    formSubmitted: false,
  }),
  validations() {
    return {
      priceRequest: {
        delivery: {
          address: {
            required,
          },
          conditions: {
            required,
          },
          date: {
            required,
          },
        },
        responseDate: {
          required,
        },
      },
    };
  },
  computed: {
    tabs(vm) {
      return [{
        name: 'Общие сведения',
        disabled: false,
        get validationStatus() {
          return vm.formSubmitted ? 'valid' : 'not-validated';
        },
      }, {
        name: 'Позиции',
        disabled: this.nameNotValid,
        get validationStatus() {
          return vm.formSubmitted ? 'valid' : 'not-validated';
        },
      }, {
        name: 'Условия заказчика',
        disabled: this.nameNotValid,
        get validationStatus() {
          if (!vm.formSubmitted) {
            return 'not-validated';
          }

          return vm.$v.priceRequest.delivery.$invalid ? 'invalid' : 'valid';
        },
      }, {
        name: 'Доп. условия',
        disabled: this.nameNotValid,
        get validationStatus() {
          if (!vm.formSubmitted) {
            return 'not-validated';
          }

          return vm.$v.priceRequest.responseDate.$invalid ? 'invalid' : 'valid';
        },
      }];
    },
    nameNotValid() {
      return this.priceRequest.name.length < 10 || this.priceRequest.name.length > 300;
    },
    responseMinDate() {
      return this.$moment().add(1, 'days').format('YYYY-MM-DD');
    },
    responseMaxDate() {
      return this.$moment(this.priceRequest.delivery.date).subtract(1, 'days').format('YYYY-MM-DD') || '';
    },
    deliveryMinDate() {
      if (this.priceRequest.responseDate) {
        return this.$moment(this.priceRequest.responseDate).add(1, 'days').format('YYYY-MM-DD');
      }
      return this.$moment().add(2, 'days').format('YYYY-MM-DD');
    },
    deliveryAddressErrors() {
      const errors = [];
      if (!this.formSubmitted) {
        return errors;
      }
      if (!this.$v.priceRequest.delivery.address.required) {
        errors.push('Обязательное поле');
      }
      return errors;
    },
    deliveryConditionsErrors() {
      const errors = [];
      if (!this.formSubmitted) {
        return errors;
      }
      if (!this.$v.priceRequest.delivery.conditions.required) {
        errors.push('Обязательное поле');
      }
      return errors;
    },
    deliveryDateErrors() {
      const errors = [];
      if (!this.formSubmitted) {
        return errors;
      }
      if (!this.$v.priceRequest.delivery.date.required) {
        errors.push('Обязательное поле');
      }
      return errors;
    },
    responseDateErrors() {
      const errors = [];
      if (!this.formSubmitted) {
        return errors;
      }
      if (!this.$v.priceRequest.responseDate.required) {
        errors.push('Обязательное поле');
      }
      return errors;
    },
    priceRequestParams() {
      return ({
        ...this.priceRequest,
        lines: this.priceRequest.lines.map((it) => {
          const item = JSON.parse(JSON.stringify(it));
          delete item.editing;
          delete item.tenant;

          return {
            ...item,
            okei: item.okei.id,
            okpd2: item.okpd2.id,
            id: typeof item.id === 'number' ? item.id : null,
            quantity: item.quantity || null,
          };
        }),
      });
    },
  },
  watch: {
    // eslint-disable-next-line
    'priceRequest.responseDate': function (val) {
      if (this.priceRequest.delivery.date && this.$moment(val).diff(this.priceRequest.delivery.date, 'days') > 0) {
        this.priceRequest.delivery.date = this.deliveryMinDate;
      }
    },
    tab() {
      this.saveRequest();
    },
  },
  created() {
    if (this.id) {
      this.getRequest();
    }
  },
  methods: {
    async getRequest() {
      this.requestId = this.id;
      const { data } = await this.$http.get(`quote-requests/${this.requestId}`);
      this.priceRequest = { ...this.priceRequest, ...data };
    },
    onPositionsChange(val) {
      this.$set(this.priceRequest, 'lines', val);
    },
    async createRequest() {
      const { data: { id } } = await this.$http.post('quote-requests', {
        name: this.priceRequest.name,
        type: this.priceRequest.type,
      });
      this.requestId = id;

      return Promise.resolve();
    },
    async saveRequest() {
      if (!this.requestId) {
        await this.createRequest();
      }

      await this.$http.put(`quote-requests/${this.requestId}`, this.priceRequestParams);
    },
    async approveRequest() {
      if (!this.requestId) {
        await this.createRequest();
      }

      try {
        await this.$http.put(`quote-requests/${this.requestId}/send`, this.priceRequestParams);
        this.$toast.success('Ценовой запрос успешно добавлен');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      } finally {
        this.validateTabs();
      }
    },
    validateTabs() {
      this.formSubmitted = true;

      const invalidTabIndex = this.tabs.findIndex((it) => it.validationStatus === 'invalid');
      if (invalidTabIndex !== -1) {
        this.tab = invalidTabIndex;
      }
    },
  },
};
</script>

<style lang="scss">
.wizard {
  &__content {
    flex: 1;
    margin-bottom: 30px;
  }

  &__actions {
    display: flex;
  }
}
</style>
