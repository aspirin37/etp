<template>
  <v-dialog
    :key="key"
    v-model="visible"
  >
    <v-form
      ref="form"
      class="modal-primary modal-primary--full-height"
      @submit.prevent="onSubmit"
    >
      <div class="modal-primary__header">
        <span>Добавление позиции из справочника</span>
        <v-btn
          icon
          dark
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="modal-primary__wrapper pt-8">
        <div class="modal-primary__content pt-16">
          <div style="min-height: 400px">
            <nsi-position-table
              :selected="selected"
              @selection-changed="selected = $event"
            />
          </div>
          <div class="modal-primary__actions">
            <v-btn
              class="ml-auto"
              depressed="depressed"
              @click="close"
            >
              Отмена
            </v-btn>
            <v-btn
              class="ml-2"
              depressed="depressed"
              color="primary"
              type="submit"
            >
              Выбрать
            </v-btn>
          </div>
        </div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
import NsiPositionTable from '@/components/NSIPositionTable.vue';

export default {
  name: 'MyPositionsModal',
  components: {
    NsiPositionTable,
  },
  props: {
    items: {
      type: Array,
    },
    value: {
      type: Boolean,
    },
  },
  data: () => ({
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
