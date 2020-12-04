<template>
  <div class="page wizard">
    <div class="page__header">
      <h1 class="page__title">
        {{ isQuote ? 'Ценовое предложение' : 'Ценовой запрос' }}
        <template v-if="priceRequest">
          {{ priceRequest.name }}
        </template>
      </h1>
    </div>
    <v-tabs
      v-model="tab"
      class="tabs-primary"
    >
      <v-tab
        v-for="(it, i) in tabs"
        :key="i"
        :ripple="false"
      >
        {{ it }}
      </v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="tab"
      class="wizard__content"
    >
      <v-tab-item v-if="isAnalysis">
        <v-card
          class="pa-0 pt-8"
          flat="flat"
        >
          <analysis
            :id="requestId"
            @winner-selected="selectWinner"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          class="pa-0 pt-8"
          flat="flat"
        >
          <position-table
            :id="requestId"
            :is-quote="isQuote"
            :quote-id="quoteId"
            :editable="editable"
            :quote-positions.sync="quotePositions"
            :errors.sync="quotePositionErrors"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          class="pa-8 pt-2"
          flat="flat"
        >
          <v-row v-if="terms">
            <v-col>
              <div
                v-for="(term, i) in terms.slice(0, 2)"
                :key="i"
                class="w-550"
              >
                <div class="app-title">
                  {{ term.name }}
                </div>
                <div
                  v-for="(field, j) in term.fields"
                  :key="j"
                  class="d-flex"
                >
                  <div class="list-label">
                    {{ field.label }}
                  </div>
                  <div class="list-value">
                    {{ field.value }}
                  </div>
                </div>
              </div>
            </v-col>
            <v-col
              v-for="(term, i) in terms.slice(2, 3)"
              :key="i"
              class="w-550"
            >
              <div class="app-title">
                {{ term.name }}
              </div>
              <div
                v-for="(field, j) in term.fields"
                :key="j"
                class="d-flex"
              >
                <div class="list-label">
                  {{ field.label }}
                </div>
                <div class="list-value">
                  {{ field.value }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          class="pa-8"
          flat="flat"
        >
          <v-row v-if="quoteRequest">
            <v-col cols="5">
              <v-row>
                <v-col
                  class="py-0"
                  cols="8"
                >
                  <date-picker
                    v-model="quoteRequest.delivery.date"
                    label="Дата поставки"
                    :min="responseMinDate"
                    :error-messages="deliveryDateErrors"
                    :disabled="!editable"
                    required
                  />
                </v-col>
              </v-row>
              <v-text-field
                v-model="quoteRequest.delivery.price"
                v-currency
                :disabled="!editable"
                label="Стоимость доставки без НДС"
                outlined
              />
              <v-row>
                <v-col
                  class="py-0"
                  cols="8"
                >
                  <v-select
                    v-model="quoteRequest.delivery.vat"
                    :items="[20, 10, 0]"
                    :disabled="!editable"
                    label="Ставка НДС, %"
                    outlined
                  />
                </v-col>
              </v-row>
              <v-textarea
                v-model="quoteRequest.comment"
                :disabled="!editable"
                label="Комментарий"
                outlined
              />
            </v-col>
            <!-- <v-col
              cols="6"
              offset="1"
            >
              <div class="subtitle-2 mb-6">
                Требования к поставщику
              </div>
              <v-checkbox
                class="mt-0 mb-2"
                label="Субъект малого и среднего предпринимательства"
                hide-details="hide-details"
              />
              <v-checkbox
                class="mt-0 mb-2"
                label="Производитель"
                hide-details="hide-details"
              />
              <v-checkbox
                class="mt-0 mb-10"
                label="Официальный дилер"
                hide-details="hide-details"
              />
              <div class="subtitle-2 mb-6">
                Требования к позициям
              </div>
              <v-checkbox
                class="mt-0 mb-10"
                label="Только товары российского производства"
                hide-details="hide-details"
              />
              <div class="subtitle-2 mb-6">
                Характеристики ЦЗ
              </div>
              <v-checkbox
                class="mt-0 mb-2"
                label="Закупка в рамках Национального проекта"
                hide-details="hide-details"
              />
              <v-checkbox
                class="mt-0 mb-10"
                label="Не отображать ЦЗ в открытых источниках"
                hide-details="hide-details"
              />
            </v-col> -->
          </v-row>
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
        v-if="tab !== tabs.length - 1"
        depressed
        color="primary"
        @click="tab++"
      >
        Далее
      </v-btn>
      <template v-if="!isUserRequest">
        <v-btn
          v-if="isQuote"
          class="ml-auto"
          type="submit"
          depressed
          color="accent"
          :loading="loading"
          @click.prevent="confirmQuote"
        >
          Отправить ценовое предложение
        </v-btn>
        <v-btn
          v-else
          class="ml-auto"
          type="submit"
          depressed
          color="accent"
          :loading="loading"
          @click="prepareQuote"
        >
          Составить ценовое предложение
        </v-btn>
      </template>
      <v-btn
        v-if="isAnalysis"
        class="ml-auto"
        depressed
        color="accent"
        :loading="loading"
        :disabled="!winner"
        @click="createOrder"
      >
        Создать заказ
      </v-btn>
    </div>
  </div>
</template>

<script>
import PriceRequestSupplierPositionTable from '@/components/price-request/PriceRequestSupplierPositionTable.vue';
import PriceRequestAnalysis from '@/components/price-request/PriceRequestAnalysis.vue';
import datePicker from '@/components/common/DatePicker.vue';
import { priceRequestTypes } from '@/utilities/enums';
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'PriceRequest',
  components: {
    PositionTable: PriceRequestSupplierPositionTable,
    analysis: PriceRequestAnalysis,
    datePicker,
  },
  props: {
    id: String,
  },
  data: () => ({
    tab: 0,
    requestId: null,
    quoteId: null,
    priceRequest: null,
    quoteRequest: null,
    quotePositions: [],
    quotePositionErrors: [],
    successModal: false,
    errorModal: false,
    formSubmitted: false,
    isQuote: false,
    loading: false,
    winner: null,
  }),
  validations() {
    return {
      quoteRequest: {
        delivery: {
          date: {
            required,
          },
        },
      },
    };
  },
  computed: {
    ...mapState(['user']),
    isUserRequest() {
      return this.priceRequest && this.user.tenant_id === this.priceRequest.customer.id;
    },
    isAnalysis() {
      return this.$route.query.analysis;
    },
    tabs() {
      const tabs = ['Анализ предложений', 'Позиции', 'Общая информация'];

      if (this.isQuote) {
        tabs.push('Условия поставщика');
      }

      if (!this.isAnalysis) {
        tabs.shift();
      }

      return tabs;
    },
    responseMinDate() {
      return this.$moment().add(1, 'days').format('YYYY-MM-DD');
    },
    deliveryDateErrors() {
      const errors = [];
      if (!this.formSubmitted) {
        return errors;
      }
      if (!this.$v.quoteRequest.delivery.date.required) {
        errors.push('Обязательное поле');
      }
      return errors;
    },
    editable() {
      return this.priceRequest && this.priceRequest.status === 'pending';
    },
    terms(vm) {
      if (!this.priceRequest && !this.quoteRequest) {
        return null;
      }

      return [{
        name: 'Общие сведения',
        fields: [{
          label: 'Тип ЦЗ',
          value: priceRequestTypes[vm.priceRequest.type] || priceRequestTypes[vm.priceRequest.type],
        }, {
          label: 'Наименование ЦЗ',
          value: vm.priceRequest.name,
        }, {
          label: 'Наименование заказчика',
          value: vm.priceRequest.customer.name,
        }, {
          label: 'ИНН',
          value: '4342301116367',
        }, {
          label: 'КПП',
          value: '773601001',
        }],
      }, {
        name: 'Поставка',
        fields: [{
          label: 'Адрес поставки',
          value: vm.priceRequest.delivery.address,
        }, {
          label: 'Условия оплаты и поставки',
          value: vm.priceRequest.delivery.terms,
        }, {
          label: 'Дата поставки',
          value: vm.priceRequest.delivery.date ? vm.$moment(vm.priceRequest.delivery.date).format('YYYY-MM-DD') : '',
        }],
      }, {
        name: 'Другие условия',
        fields: [{
          label: 'Субъект малого и среднего предпринимательства',
          value: vm.priceRequest.requirements.smallBusiness ? 'Да' : 'Нет',
        }, {
          label: 'Производитель',
          value: vm.priceRequest.requirements.manufacturer ? 'Да' : 'Нет',
        }, {
          label: 'Официальный дилер',
          value: vm.priceRequest.requirements.authorizedDealer ? 'Да' : 'Нет',
        }, {
          label: 'Только товары российского производства',
          value: vm.priceRequest.requirements.russianProduction ? 'Да' : 'Нет',
        }, {
          label: 'Закупка в рамках Национального проекта',
          value: vm.priceRequest.requirements.nationalProject ? 'Да' : 'Нет',
        }, {
          label: 'Не отображать ЦЗ в открытых источниках',
          value: vm.priceRequest.requirements.privateRequest ? 'Да' : 'Нет',
        }, {
          label: 'Желаемая дата ответа на запрос',
          value: vm.priceRequest.delivery.date ? vm.$moment(vm.priceRequest.responseDate).format('YYYY-MM-DD') : '',
        }, {
          label: 'Комментарий',
          value: vm.priceRequest.comment,
        }],
      }];
    },
  },
  created() {
    if (this.$route.query.isQuote) {
      this.quoteId = this.id;
      this.loading = true;
      Promise.all([
        this.getQuoteRequest(),
        this.getQuoteItems(),
      ]).finally(() => {
        this.loading = false;
      });

      this.isQuote = true;
      this.tab = 0;
      return;
    }

    this.getRequest();
  },
  methods: {
    async getRequest() {
      this.requestId = this.id;
      const { data } = await this.$http.get(`quote-requests/${this.requestId}`);
      this.priceRequest = { ...this.priceRequest, ...data };
    },
    async prepareQuote() {
      this.loading = true;
      await this.createQuoteRequest();

      Promise.all([
        this.getQuoteRequest(),
        this.getQuoteItems(),
      ]).finally(() => {
        this.loading = false;
      });

      this.isQuote = true;
      this.tab = 0;
    },
    async createQuoteRequest() {
      const { headers } = await this.$http.post('quotes', {
        quoteRequestId: this.id,
      });

      this.quoteId = headers.location.slice(-36);
      return Promise.resolve();
    },
    async getQuoteRequest() {
      const { data } = await this.$http.get(`quotes/${this.quoteId}`);
      this.quoteRequest = data;
      this.priceRequest = data.quoteRequest;
      return Promise.resolve();
    },
    async getQuoteItems() {
      const { data } = await this.$http.get(`quotes/${this.quoteId}/items`);
      this.quotePositions = data.map((it) => ({
        ...it, ...it.quoteRequestItem,
      }));
      return Promise.resolve();
    },
    async confirmQuote() {
      this.loading = true;

      const price = typeof this.quoteRequest.delivery.price === 'string'
        ? this.$ci.parse(this.quoteRequest.delivery.price)
        : this.quoteRequest.delivery.price;

      try {
        await this.$http.put(`quotes/${this.quoteId}`, {
          delivery: {
            date: this.$moment(this.quoteRequest.delivery.date).format('YYYY-MM-DD'),
            price,
            vat: this.quoteRequest.delivery.vat,
          },
          comment: this.quoteRequest.comment,
        });

        await this.$http.patch(`quotes/${this.quoteId}/confirm`);
        this.$toast.success('Ценовое предложение отправлено!');
        this.$router.push('/price-requests/inbox');
      } catch (e) {
        this.validateTabs(e);
      } finally {
        this.loading = false;
      }
    },
    selectWinner(supplierId) {
      this.winner = supplierId;
    },
    async createOrder() {
      const { headers } = await this.$http.patch(`quote-requests/${this.requestId}/create-order`);
      const orderId = headers.location.slice(-36);

      this.$router.push(`/purchase-order/${orderId}`);
    },
    validateTabs(e) {
      this.formSubmitted = true;

      const noPositionSelectedError = e.response.data.errors.find(({ path }) => !path);
      if (noPositionSelectedError) {
        this.$toast.error(noPositionSelectedError.details);
        this.tab = 0;
        return;
      }

      const regExp = /\[([^)]+)\]/;
      const positionErrors = e.response.data.errors
        .filter((it) => it.path.includes('items'))
        .map((it) => regExp.exec(it.path)[1]);

      if (positionErrors.length) {
        this.$toast.error('Пожалуйста, укажите цену и НДС для всех выбранных позиций');
        this.quotePositionErrors = positionErrors;
        this.tab = 0;
        return;
      }

      if (this.$v.quoteRequest.delivery.$invalid) {
        this.$toast.error('Пожалуйста, заполните указанные поля');
        this.tab = 2;
      }

      // const invalidTabIndex = this.tabs.findIndex((it) => it.validationStatus === 'invalid');
      // if (invalidTabIndex !== -1) {
      //   this.tab = invalidTabIndex;
      // }
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
