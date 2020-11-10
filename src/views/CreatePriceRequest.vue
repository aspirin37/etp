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
              v-model="priceRequest.customer.name"
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
          <position-table
            v-if="requestId"
            :request-id="requestId"
            :positions.sync="priceRequestPositions"
            :errors.sync="priceRequestPositionErrors"
          />
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
              v-model="priceRequest.delivery.terms"
              class="required"
              :error-messages="deliveryTermsErrors"
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
                  required
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
                  required
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
    priceRequest: null,
    priceRequestPositions: [],
    priceRequestPositionErrors: [],
    default: {
      name: '',
      type: 'standard',
      customer: 'Вася',
      inn: '7731347089',
      kpp: '773101001',
      responseDate: null,
      comment: '',
      delivery: {
        address: '',
        terms: '',
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
          terms: {
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
          if (!vm.formSubmitted) {
            return 'not-validated';
          }

          if (!vm.priceRequestPositions.length) {
            return 'invalid';
          }

          if (vm.priceRequestPositionErrors.length) {
            // const regExp = /\[([^)]+)\]/;
            return 'invalid';
          }

          return 'valid';
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
    deliveryTermsErrors() {
      const errors = [];
      if (!this.formSubmitted) {
        return errors;
      }
      if (!this.$v.priceRequest.delivery.terms.required) {
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
    id() {
      if (!this.id) {
        this.reset();
      }
    },
  },
  created() {
    this.reset();
    if (this.id) {
      this.getRequest();
    }
  },
  methods: {
    reset() {
      this.priceRequest = JSON.parse(JSON.stringify(this.default));
    },
    async getRequest() {
      this.requestId = this.id;
      const { data } = await this.$http.get(`quote-requests/${this.requestId}`);
      this.priceRequest = { ...this.priceRequest, ...data };
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

      await this.$http.put(`quote-requests/${this.requestId}`, this.priceRequest);
      return Promise.resolve();
    },
    async approveRequest() {
      if (!this.requestId) {
        await this.createRequest();
      }

      try {
        await this.saveRequest();
        await this.$http.patch(`quote-requests/${this.requestId}/publish`);
        this.$toast.success('Ценовой запрос успешно добавлен');
        this.$router.push('/price-requests/outbox');
      } catch (e) {
        this.validateTabs(e);
      }
    },
    validateTabs(e) {
      this.formSubmitted = true;

      const emptyPositionsError = e.response.data.errors.find((it) => it.path === 'items');

      if (emptyPositionsError) {
        this.$toast.danger(emptyPositionsError.details);
        this.tab = 1;
        return;
      }

      const regExp = /\[([^)]+)\]/;
      const positionErrors = e.response.data.errors
        .filter((it) => it.path.includes('items'))
        .map((it) => regExp.exec(it.path)[1]);

      if (positionErrors.length) {
        this.$toast.danger('Для указанных позиций не заполнено количество');
        this.priceRequestPositionErrors = positionErrors;
        this.tab = 1;
      }

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
