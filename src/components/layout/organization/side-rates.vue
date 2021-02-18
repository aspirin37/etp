<template>
  <v-sheet class="side-sheet rates-sheet">
    <div class="rating-round">
      <v-progress-circular
        :color="totalRate > 50 ? 'green' : (totalRate < 25 ? 'red' : 'orange')"
        rotate="-90"
        size="100"
        :value="totalRate"
        width="5"
      />
      <h1>{{ totalRate }}%</h1>
    </div>
    <v-container>
      <v-row
        v-for="rate in rates"
        :key="rate.name"
      >
        <span>{{ rate.name }}</span>
        <span>{{ rate.value }}%</span>
        <v-progress-linear
          :key="rate.name"
          background-opacity="1"
          :color="rate.value > 50 ? 'green' : (rate.value < 25 ? 'red' : 'orange')"
          :value="rate.value"
        />
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  props: {
    rates: Array,
  },
  computed: {
    totalRate: ({ rates }) => Math.ceil(rates.reduce((acc, cur) => acc + cur.value, 0) / rates.length),
  },
};
</script>
