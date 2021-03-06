<template>
  <div class="page wizard">
    <div class="page__header d-flex align-baseline">
      <h1 class="page__title mr-6">
        Заказ
        <template v-if="order">
          {{ order.quoteRequest.name }} от {{ order.createdAt | moment('DD.MM.YYYY') }}
        </template>
      </h1>
      <span v-if="order">
        {{ orderStatuses[order.status] }}
      </span>
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
          class="pa-8 pt-2"
          flat="flat"
        >
          <v-row v-if="order">
            <v-col xl="4">
              <template v-for="(it, i) in orderInfo">
                <div
                  v-if="it.position === 'left'"
                  :key="i"
                >
                  <div class="app-title">
                    {{ it.name }}
                  </div>
                  <div
                    v-for="(field, j) in it.fields"
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
            </v-col>
            <v-col xl="4">
              <template v-for="(it, i) in orderInfo">
                <div
                  v-if="it.position === 'right'"
                  :key="i"
                >
                  <div class="app-title">
                    {{ it.name }}
                  </div>
                  <div
                    v-for="(field, j) in it.fields"
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
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          class="pa-0 pt-8"
          flat="flat"
        >
          <positions-table :id="id" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import PurchaseOrderPositionsTable from '@/components/PurchaseOrderPositionsTable.vue';
import { orderStatuses, priceRequestTypes } from '@/utilities/enums';

export default {
  name: 'PurchaseOrder',
  components: {
    positionsTable: PurchaseOrderPositionsTable,
  },
  props: {
    id: String,
    type: String,
  },
  data() {
    return {
      tab: 0,
      tabs: ['Информация о заказе', 'Позиции заказа'],
      order: null,
      orderStatuses,
    };
  },
  computed: {
    orderInfo() {
      return [{
        name: 'Ценовой запрос',
        position: 'left',
        fields: [{
          label: 'Наименование',
          value: this.order.quoteRequest.name,
        }, {
          label: 'Тип ЦЗ',
          value: priceRequestTypes[this.order.quoteRequest.type],
        }],
      }, {
        name: 'Заказчик',
        position: 'left',
        fields: [{
          label: 'Наименование',
          value: this.order.customer.name,
        }],
      }, {
        name: 'Поставщик',
        position: 'left',
        fields: [{
          label: 'Наименование',
          value: this.order.supplier.name,
        }],
      }, {
        name: 'Стоимость',
        position: 'left',
        fields: [{
          label: 'Сумма заказа без НДС',
          value: this.toCurrency(this.order.total.sum),
        }, {
          label: 'Сумма заказа с НДС',
          value: this.toCurrency(this.order.total.withVat),
        }, {
          label: 'Общая стоимость заказа с доставкой',
          value: this.toCurrency(this.order.total.withDelivery),
        }, {
          label: 'Общая стоимость заказа с доставкой и НДС',
          value: this.toCurrency(this.order.total.withDeliveryVat),
        }],
      }, {
        name: 'Дополнительная информация',
        position: 'right',
        fields: [{
          label: 'Дата доставки',
          value: this.$moment(this.order.delivery.date).format('DD.MM.YYYY'),
        }, {
          label: 'Адрес доставки',
          value: this.order.delivery.address,
        }, {
          label: 'Стоимость доставки',
          value: this.toCurrency(this.order.delivery.price),
        }, {
          label: 'НДС',
          value: this.order.delivery.vat,
        }, {
          label: 'Условия доставки',
          value: this.order.delivery.terms,
        }],
      }];
    },
  },
  created() {
    this.getOrder();
  },
  methods: {
    async getOrder() {
      let url = `purchase-orders/${this.id}`;
      if (this.type) {
        url = `purchase-orders/${this.type}/${this.id}`;
      }
      const { data } = await this.$http.get(url);
      this.order = data;
    },
    toCurrency(value) {
      if (typeof value !== 'number') {
        return value;
      }

      return `${value.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽`;
    },
    // f2e5de40-1cab-43c9-af8e-c24814a99439
  },
};
</script>
