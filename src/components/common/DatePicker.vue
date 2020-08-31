<template>
  <v-menu
    v-model="visible"
    :close-on-content-click="false"
    max-width="290"
    offset-y="offset-y"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="dateFormatted"
        :label="label"
        :class="{'required': required}"
        :error-messages="errorMessages"
        append-icon="date_range"
        outlined="outlined"
        v-bind="attrs"
        v-on="on"
        @click:append="visible = !visible"
      />
    </template>
    <v-date-picker
      v-model="date"
      :min="min"
      :max="max"
      no-title="no-title"
      color="primary"
      @input="visible = false"
    />
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    label: String,
    value: String,
    min: String,
    max: String,
    required: Boolean,
    errorMessages: String,
  },
  data: () => ({
    visible: false,
  }),

  computed: {
    date: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    dateFormatted() {
      return this.date ? this.$moment(this.date).format('DD.MM.YYYY') : '';
    },
  },
};
</script>

<style>

</style>
