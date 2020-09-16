<template>
  <v-autocomplete
    v-model="okei"
    :items="okeiList"
    label="Единицы измерения"
    item-text="fullName"
    item-value="id"
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
    const okeiList = await getOkei();
    this.okeiList = okeiList.map((item) => ({
      id: item.id,
      fullName: item.name.national,
    }));
  },
};
</script>

<style>

</style>
