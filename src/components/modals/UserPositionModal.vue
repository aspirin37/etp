<template>
  <v-dialog
    v-model="visible"
  >
    <v-form
      ref="form"
      class="modal-primary modal-primary--full-height"
      @submit.prevent="onSubmit"
    >
      <div class="modal-primary__header">
        <span>Мои позиции</span>
        <v-btn
          icon="icon"
          dark="dark"
          @click="close"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__content">
          <user-position-table
            :selected="selected"
            :editable="false"
            @selection-changed="selected = $event"
          />
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
import UserPositionTable from '@/components/UserPositionTable.vue';

export default {
  name: 'UserPositionModal',
  components: {
    UserPositionTable,
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
  }),
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  watch: {
    visible() {
      this.reset();
    },
  },
  methods: {
    reset() {
      this.selected = this.items.filter((it) => it.position);
    },
    close() {
      this.visible = false;
    },
    async onSubmit() {
      this.$emit('submit', this.selected);
      this.close();
    },
  },
};
</script>
