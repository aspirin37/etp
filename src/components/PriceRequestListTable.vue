<template>
  <div class="main-table price-request-table">
    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :footer-props="{
        itemsPerPageOptions: [20],
      }"
      :server-items-length="total"
      show-select
      disable-sort
      fixed-header
      class="elevation-0"
    >
      <template v-slot:[`header.actions`]="{}">
        <v-icon size="20">
          mdi-cog
        </v-icon>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <router-link
          :to="{
            name: 'PriceRequest',
            params: {id: item.id}
          }"
        >
          {{ item.name }}
        </router-link>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          size="20"
          class="mr-2"
          @click="$router.push({
            name: 'CreatePriceRequest',
            params: {id: item.id}
          })"
        >
          mdi-send
        </v-icon>
        <v-icon
          size="16"
          class="mr-2"
          @click="cloneItem(item.id)"
        >
          mdi-content-copy
        </v-icon>
        <v-icon
          size="20"
          @click="removeItem(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>

export default ({
  name: 'PriceRequestListTable',
  data() {
    return {
      headers: [{
        value: 'created',
        text: 'Дата создания',
        width: '140px',
      }, {
        value: 'name',
        text: 'Наименование ЦЗ',
      }, {
        value: 'type',
        text: 'Тип ЦЗ',
      }, {
        value: 'responseDate',
        text: 'Дата предоставления ответа на ЦЗ',
        width: '140px',
      }, {
        value: 'delivery.address',
        text: 'Адрес поставки',
      }, {
        value: 'delivery.date',
        text: 'Предполагаемая дата выполнения работ',
        width: '140px',
      }, {
        value: 'actions',
        text: 'Действия',
        width: '150px',
        align: 'center',
      }],
      items: [],
      total: 0,
      options: {
        page: 1,
        itemsPerPage: 20,
      },
    };
  },
  watch: {
    options: {
      handler() {
        this.getItems();
      },
      deep: true,
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      const { data, headers } = await this.$http.get('quote-requests', {
        params: { page: this.options.page },
      });
      this.items = data.map((it) => ({
        ...it,
        created: it.created ? this.$moment(it.created).format('DD.MM.YYYY, hh:mm') : '',
        responseDate: it.responseDate ? this.$moment(it.responseDate).format('DD.MM.YYYY, hh:mm') : '',
        delivery: {
          ...it.delivery,
          date: it.delivery.date ? this.$moment(it.delivery.date).format('DD.MM.YYYY, hh:mm') : '',
        },
      }));

      this.total = +headers['x-pagination-total-count'];
    },
    async cloneItem(id) {
      try {
        await this.$http.patch(`quote-requests/${id}/clone`);
        this.getItems();
        this.$toast.success('Позиция успешно скопирована');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    async removeItem(id) {
      try {
        await this.$http.delete(`quote-requests/${id}`);
        this.getItems();
        this.$toast.success('Ценовой запрос успешно удален');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
  },
});
</script>

<style lang="scss">
.price-request-table .v-data-table__wrapper {
  max-height: calc(100vh - 360px);
}
</style>
