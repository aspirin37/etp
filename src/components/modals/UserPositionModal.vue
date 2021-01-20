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
        <span>Добавление позиции</span>
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
          <v-tabs
            v-model="tab"
            class="mb-2"
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
            class="wizard__content modal-tabs mb-0"
          >
            <v-tab-item>
              <user-position-table
                :selected="selected"
                :editable="false"
                @selection-changed="selected = $event"
              />
            </v-tab-item>
            <v-tab-item>
              <nsi-position-table
                :selected="selected"
                @selection-changed="selected = $event"
              />
            </v-tab-item>
          </v-tabs-items>
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
import NsiPositionTable from '@/components/NSIPositionTable.vue';

export default {
  name: 'UserPositionModal',
  components: {
    UserPositionTable,
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
