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
      <v-tab :ripple="false">
        <v-avatar size="20">
          1
        </v-avatar>
        <span>Общие сведения</span>
      </v-tab>
      <v-tab
        :ripple="false"
        :disabled="nameNotValid"
      >
        <v-avatar size="20">
          2
        </v-avatar>
        <span>Позиции</span>
      </v-tab>
      <v-tab
        :ripple="false"
        :disabled="nameNotValid"
      >
        <v-avatar size="20">
          3
        </v-avatar>
        <span>Условия заказчика</span>
      </v-tab>
      <v-tab
        :ripple="false"
        :disabled="nameNotValid"
      >
        <v-avatar size="20">
          4
        </v-avatar>
        <span>Доп. условия</span>
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
              :error-messages="violations.name"
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
              :error-messages="violations['delivery[address]']"
              label="Адрес поставки"
              outlined="outlined"
            />
            <v-text-field
              v-model="priceRequest.delivery.conditions"
              class="required"
              :error-messages="violations['delivery[conditions]']"
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
                  :error-messages="violations['delivery[date]']"
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
                  :error-messages="violations.responseDate"
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
    <notice-modal
      v-model="successModal"
      icon="checkCircle"
    >
      <template v-slot:title>
        Ценовой запрос сохранен
      </template>
      <template v-slot:footer>
        <v-btn
          depressed="depressed"
          @click="successModal = false"
        >
          Закрыть
        </v-btn>
      </template>
    </notice-modal>
    <notice-modal
      v-model="errorModal"
      icon="alertTriangle"
    >
      <template v-slot:title>
        При добавлении позиции произошла ошибка
      </template>
      <template v-slot:footer>
        <v-btn
          depressed="depressed"
          @click="errorModal = false"
        >
          Закрыть
        </v-btn>
      </template>
    </notice-modal>
  </div>
</template>

<script>
import PriceRequestPositionTable from '@/components/PriceRequestPositionTable';
import datePicker from '@/components/common/DatePicker';
import NoticeModal from '@/components/modals/NoticeModal.vue';

import axios from '@/utilites/api/AxiosInstance';

export default {
  name: 'CreatePriceRequest',
  components: {
    PositionTable: PriceRequestPositionTable,
    datePicker,
    NoticeModal,
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
    violations: {},
  }),
  computed: {
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
    priceRequestParams() {
      return ({
        ...this.priceRequest,
        lines: this.priceRequest.lines.map((it) => ({
          ...it,
          okei: it.okei.id,
          okpd2: it.okpd2.id,
        })),
      });
    },
  },
  watch: {
    'priceRequest.responseDate': function (val) {
      if (this.priceRequest.delivery.date && this.$moment(val).diff(this.priceRequest.delivery.date, 'days') > 0) {
        this.priceRequest.delivery.date = this.deliveryMinDate;
      }
    },
    async tab() {
      if (this.requestId) {
        await axios.put(`quote-requests/${this.requestId}`, this.priceRequestParams);
      }

      const { data: { id } } = await axios.post('quote-requests', {
        name: this.priceRequest.name,
        type: this.priceRequest.type,
      });
      this.requestId = id;
    },
  },
  methods: {
    onPositionsChange(val) {
      this.$set(this.priceRequest, 'lines', val);
    },
    async approveRequest() {
      try {
        await axios.put(`quote-requests/${this.requestId}/send`, this.priceRequestParams);
        this.successModal = true;
      } catch (e) {
        this.violations = e.response.data.violations;
        this.errorModal = true;
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
