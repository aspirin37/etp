<template>
  <div class="page wizard">
    <div class="page__header">
      <h1 class="page__title">
        Ценовой запрос
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
      <v-tab-item>
        <v-card
          class="pa-0 pt-8"
          flat="flat"
        >
          <position-table :id="requestId" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          class="pa-8 pt-2"
          flat="flat"
        >
          <template
            v-if="priceRequest"
          >
            <div
              v-for="(term, i) in terms"
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
          </template>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          class="pa-8"
          flat="flat"
        >
          <div
            v-if="priceRequest"
            class="w-550"
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
            <v-row>
              <v-col
                class="py-0"
                cols="8"
              >
                <date-picker
                  label="Дата поставки"
                  :min="responseMinDate"
                  :max="responseMaxDate"
                  required
                />
              </v-col>
            </v-row>
            <v-text-field
              label="Стоимость доставки без НДС"
              class="required"
              outlined
            />
            <v-row>
              <v-col
                class="py-0"
                cols="8"
              >
                <v-text-field
                  label="Ставка НДС, %"
                  class="required"
                  outlined
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
        v-if="tab !== 2"
        depressed
        color="primary"
        @click="tab++"
      >
        Далее
      </v-btn>
      <v-btn
        v-if="!isUserRequest"
        class="ml-auto"
        type="submit"
        depressed="depressed"
        color="accent"
        @click.prevent
      >
        Отправить ответ заказчику
      </v-btn>
    </div>
  </div>
</template>

<script>
import PriceRequestSupplierPositionTable from '@/components/PriceRequestSupplierPositionTable.vue';
import datePicker from '@/components/common/DatePicker.vue';
import { priceRequestTypes } from '@/utilities/enums';
import { mapState } from 'vuex';

export default {
  name: 'PriceRequest',
  components: {
    PositionTable: PriceRequestSupplierPositionTable,
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
    successModal: false,
    errorModal: false,
    formSubmitted: false,
  }),
  computed: {
    ...mapState(['user']),
    isUserRequest() {
      return this.priceRequest && this.user.tenant_id === this.priceRequest.customer.id;
    },
    tabs() {
      const tabs = ['Позиции', 'Общая информация'];

      if (!this.isUserRequest) {
        tabs.push('Условия поставщика');
      }

      return tabs;
    },
    responseMinDate() {
      return this.$moment().add(1, 'days').format('YYYY-MM-DD');
    },
    responseMaxDate() {
      return this.priceRequest && this.priceRequest.delivery.date ? this.$moment(this.priceRequest.delivery.date).subtract(1, 'days').format('YYYY-MM-DD') : '';
    },
    terms(vm) {
      if (!this.priceRequest) {
        return null;
      }

      return [{
        name: 'Общие сведения',
        fields: [{
          label: 'Тип ЦЗ',
          value: priceRequestTypes[vm.priceRequest.type],
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
    this.getRequest();
  },
  methods: {
    async getRequest() {
      this.requestId = this.id;
      const { data } = await this.$http.get(`quote-requests/${this.requestId}`);
      this.priceRequest = { ...this.priceRequest, ...data };
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
