<template>
  <v-dialog
    v-model="visible"
    max-width="900"
  >
    <div class="modal-primary modal-primary--overflowed">
      <div class="modal-primary__header">
        <span>ОКПД2</span>
        <v-btn
          icon
          dark
          @click="onClose"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__sub-header">
          <v-text-field
            v-model="search"
            label="Поиск категории, по коду или имени"
            prepend-inner-icon="mdi-search"
            hide-details
            filled
          />
        </div>
        <div class="modal-primary__content">
          <v-treeview
            :active.sync="active"
            :items="items"
            :load-children="loadChild"
            selection-type="independent"
            item-disabled="locked"
            return-object
            activatable
            open-all
          >
            <template v-slot:prepend="{ item }">
              <span class="grey--text">{{ item.code }}</span>
            </template>
          </v-treeview>
        </div>
        <div class="modal-primary__actions">
          <v-btn
            class="ml-auto"
            depressed
            @click="onClose"
          >
            Отмена
          </v-btn>
          <v-btn
            class="ml-2"
            depressed
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
    const { data } = await this.$http.get('okpd2');
    this.items = data.map((item) => ({
      ...item,
      id: item.code,
      locked: true,
      children: [],
    }));
  },
  methods: {
    async loadChild(item) {
      const { data } = await this.$http.get('okpd2', {
        params: {
          parentCode: item.code,
        },
      });

      item.children.push(...data.map((it) => ({ ...it, id: it.code, children: [] })));
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
