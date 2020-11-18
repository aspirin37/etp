<template>
  <div class="page wizard">
    <div class="page__header d-flex align-baseline">
      <h1 class="page__title mr-6">
        Заказ
        <template v-if="order">
          от {{ order.createdAt | moment('DD.MM.YYYY') }}
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
            <v-col>
              <div
                v-for="(it, i) in orderInfo"
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
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { orderStatuses } from '@/utilities/enums';

export default {
  name: 'PurchaseOrder',
  props: {
    id: String,
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
        name: 'Заказчик',
        fields: [{
          label: 'Наименование',
          value: this.order.customer.name,
        }],
      }, {
        name: 'Поставщик',
        fields: [{
          label: 'Наименование',
          value: this.order.supplier.name,
        }],
      }, {
        name: 'Стоимость',
        fields: [{
          label: 'Сумма заказа без НДС',
          value: this.order.total.sum,
        }, {
          label: 'Сумма заказа с НДС',
          value: this.order.total.withVat,
        }, {
          label: 'Общая стоимость заказа с доставкой',
          value: this.order.total.withDelivery,
        }, {
          label: 'Общая стоимость заказа с доставкой и НДС',
          value: this.order.total.withDeliveryVat,
        }],
      }, {
        name: 'Дополнительная информация',
        fields: [{
          label: 'Дата доставки',
          value: this.$moment(this.order.delivery.date).format('DD.MM.YYYY'),
        }, {
          label: 'Адрес доставки',
          value: this.order.delivery.address,
        }, {
          label: 'Стоимость доставки',
          value: this.order.delivery.price,
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
      const { data } = await this.$http.get(`purchase-orders/${this.id}`);
      this.order = data;
    },
    // f2e5de40-1cab-43c9-af8e-c24814a99439
  },
};
</script>