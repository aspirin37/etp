<template>
  <v-dialog
    :key="key"
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
            label="Поиск по коду или имени"
            prepend-inner-icon="mdi-magnify"
            hide-details
            clearable
            filled
          />
        </div>
        <div class="modal-primary__content">
          <v-treeview
            v-if="search === '' || search === null"
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
          <v-list
            v-if="search !== ''"
            dense
          >
            <v-list-item-group
              v-model="activeFromSearch"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in itemsFromSearch"
                :key="i"
              >
                <div class="d-flex">
                  <span class="mr-4 grey--text">{{ item.code }}</span>
                  <span>{{ item.name }}</span>
                </div>
              </v-list-item>
            </v-list-item-group>
          </v-list>
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
import throttle from 'lodash.throttle';

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
      itemsFromSearch: [],
      active: [],
      activeFromSearch: null,
      key: 0,
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
    throttleSearch() {
      return throttle(this.searchItems, 300);
    },
  },
  watch: {
    search() {
      this.active = [];
      this.searchItems();
    },
    activeFromSearch(val) {
      this.active = [this.itemsFromSearch[val]];
    },
  },
  created() {
    this.getTree();
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
    async getTree() {
      const { data } = await this.$http.get('okpd2');
      this.items = data.map((item) => ({
        ...item,
        id: item.code,
        locked: true,
        children: [],
      }));
    },
    async searchItems() {
      const { data } = await this.$http.get('okpd2/search', {
        params: {
          query: this.search,
          perPage: 50,
        },
      });
      this.itemsFromSearch = data;
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
