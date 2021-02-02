<template>
  <v-autocomplete
    v-model="okei"
    :items="okeiList"
    label="Единицы измерения"
    :class="{'required': required}"
    item-text="name"
    item-value="code"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :outlined="outlined"
    :dense="dense"
    return-object
    cache-items
  />
</template>

<script>
import getOkei from '@/utilities/dictionaries/okei';

export default {
  name: 'OkeiAutocomplete',
  props: {
    value: Object,
    dense: Boolean,
    outlined: Boolean,
    required: Boolean,
    hideDetails: Boolean,
    errorMessages: Array,
  },
  data: () => ({
    okeiList: [],
  }),
  computed: {
    okei: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  async created() {
    this.okeiList = await getOkei();
  },
};
</script>

<style>

</style>
