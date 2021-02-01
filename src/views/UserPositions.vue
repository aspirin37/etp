<template>
  <div class="page wizard">
    <div class="page__header">
      <h1 class="page__title">
        Мои позиции
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
    <v-card
      class="pa-0 pt-3"
      flat="flat"
      height="100%"
    >
      <user-position-table />
    </v-card>
  </div>
</template>

<script>
import UserPositionTable from '@/components/UserPositionTable.vue';

export default {
  name: 'UserPositions',
  components: {
    UserPositionTable,
  },
  data: () => ({
    tab: 0,
    tabs: ['Покупка', 'Продажа', 'Склад', 'Обработка'],
  }),
};
</script>
