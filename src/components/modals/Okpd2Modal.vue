<template>
  <v-dialog
    v-model="visible"
    max-width="900"
  >
    <div class="modal-primary modal-primary--overflowed">
      <div class="modal-primary__header">
        <span>ОКПД2</span>
        <v-btn
          icon="icon"
          dark="dark"
          @click="onClose"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__sub-header">
          <v-text-field
            v-model="search"
            label="Поиск категории, по коду или имени"
            prepend-inner-icon="search"
            hide-details="hide-details"
            filled="filled"
          />
        </div>
        <div class="modal-primary__content">
          <v-treeview
            :active.sync="active"
            :items="items"
            :load-children="loadChild"
            return-object="return-object"
            activatable="activatable"
          />
        </div>
        <div class="modal-primary__actions">
          <v-btn
            class="ml-auto"
            depressed="depressed"
            @click="onClose"
          >
            Отмена
          </v-btn>
          <v-btn
            class="ml-2"
            depressed="depressed"
            color="primary"
            type="button"
            :disabled="!active.length"
            @click="onSubmit"
          >
            Выбрать
          </v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { getParents, getChild } from '@/utilities/dictionaries/okpd2';

export default {
  name: 'Okpd2Modal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      items: [],
      active: [],
    };
  },
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
  async created() {
    const response = await getParents();
    this.items = response.map((item) => ({ ...item, children: [] }));
  },
  methods: {
    async loadChild(item) {
      const response = await getChild(item.code);
      const mappedResponse = response.map((it) => ({ ...it, children: [] }));
      item.children.push(...mappedResponse);
    },
    onClose() {
      this.visible = false;
    },
    onSubmit() {
      this.$emit('submit', this.active[0]);
      this.onClose();
    },
  },
};
</script>
