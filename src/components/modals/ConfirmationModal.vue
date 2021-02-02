<template>
  <v-dialog
    :key="key"
    v-model="visible"
    :width="width"
  >
    <v-form
      class="modal-primary modal-primary--full-height"
      @submit.prevent="onSubmit"
    >
      <div class="modal-primary__header">
        <i />
        <v-btn
          icon
          dark
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__content">
          <div class="text-h5 text-center py-4">
            {{ text }}
          </div>
          <div class="modal-primary__actions">
            <v-btn
              class="mr-auto"
              depressed="depressed"
              @click="close"
            >
              Отмена
            </v-btn>
            <v-btn
              class="ml-auto"
              depressed="depressed"
              color="primary"
              type="submit"
            >
              Продолжить
            </v-btn>
          </div>
        </div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>

export default {
  name: 'UserPositionModal',
  props: {
    items: Array,
    value: Boolean,
    text: String,
    width: [String, Number],
  },
  data: () => ({
    tab: 0,
    tabs: [
      'Мои позиции',
      'Позиции из справочника',
    ],
    selected: [],
    key: 0,
  }),
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
        this.selected = [];
      },
    },
  },
  methods: {
    close() {
      this.visible = false;
      setTimeout(() => {
        this.tab = 0;
        this.key++;
      }, 500);
    },
    async onSubmit() {
      this.$emit('submit', this.selected.map((it) => ({
        ...it,
        comment: '',
        quantity: null,
      })));
      this.close();
    },
  },
};
</script>

<style lang="scss">
.modal-tabs {
  min-height: 400px;
}
</style>
