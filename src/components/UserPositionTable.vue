<template>
  <div class="main-table pt-3">
    <manual-user-position-modal
      v-if="positionModal"
      v-model="positionModal"
      :position-edited="positionEdited"
      @submit="onSubmit"
    />
    <my-positions-modal
      v-if="myPositionsModal"
      v-model="myPositionsModal"
      :position-edited="positionEdited"
      @submit="onSubmit"
    />
    <div
      v-if="editable"
      class="main-table__wrapper mb-3"
    >
      <div class="row">
        <div class="col-auto pr-1">
          <v-btn
            depressed
            color="accent"
            to="/create-price-request"
          >
            Создать ЦЗ
          </v-btn>
        </div>
        <div class="col-auto pl-1">
          <dropdown
            :split="true"
            variant="warning"
            @click="myPositionsModal = true"
          >
            Добавить позицию
            <template v-slot:dropdown-content>
              <!-- <dropdown-item href="#">
                Создать из файла
              </dropdown-item> -->
              <dropdown-item @click.prevent.native="positionModal = true">
                Создать вручную
              </dropdown-item>
            </template>
          </dropdown>
        </div>
        <v-spacer />
        <div class="col-auto pl-1">
          <a
            class="view-setter"
            :class="{ active: dataView === 'grid' }"
            href="@shape-grid"
            @click.prevent="setView('grid')"
          >
            <SvgIcon
              name="shape-grid"
              original
            />
          </a>
          <a
            class="view-setter"
            :class="{ active: dataView === 'list-big' }"
            href="@shape-list-big"
            @click.prevent="setView('list-big')"
          >
            <SvgIcon
              name="shape-list-big"
              original
            />
          </a>
          <a
            class="view-setter"
            :class="{ active: dataView === 'list-small' }"
            href="@shape-list-small"
            @click.prevent="setView('list-small')"
          >
            <SvgIcon
              name="shape-list-small"
              original
            />
          </a>
        </div>
      </div>
    </div>
    <v-data-table
      v-if="items.length && dataView === 'list-small'"
      v-model="selectedItems"
      :headers="headers"
      :items="items"
      show-select
      disable-sort
      fixed-header
      class="elevation-0"
    >
      <template v-slot:[`header.actions`]="{}">
        <v-icon size="20">
          mdi-cog
        </v-icon>
      </template>
      <template v-slot:[`item.okei`]="{ item }">
        {{ item.okei && item.okei.name }}
      </template>
      <template v-slot:[`item.okpd2`]="{ item }">
        {{ item.okpd2 && item.okpd2.code }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          size="20"
          class="mr-2"
          @click="showUpdateModal(item)"
        >
          mdi-pencil
        </v-icon>
        <v-menu
          offset-y
          left
        >
          <template v-slot:activator="{ on }">
            <v-icon
              size="20"
              v-on="on"
            >
              mdi-dots-horizontal
            </v-icon>
          </template>
          <v-list>
            <v-list-item @click="clonePosition(item.id)">
              <v-icon
                size="20"
                class="mr-2"
              >
                mdi-content-copy
              </v-icon>
              Копировать
            </v-list-item>
            <v-list-item @click="removePosition(item.id)">
              <v-icon
                size="20"
                class="mr-2"
              >
                mdi-delete
              </v-icon>
              Удалить
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <div
      v-else-if="dataView === 'list-big' || dataView === 'grid'"
      :class="`${dataView}-table`"
    >
      <div class="grid-table--header row">
        <div class="favorite-all col-auto">
          <SvgIcon
            name="starred"
          />
        </div>
        <div class="checkbox-all col-auto pa-0 py-1">
          <v-checkbox
            v-model="allChecked"
            class="ma-0 mr-3"
            label="Выбрать все"
            hide-details="hide-details"
          />
        </div>
        <div class="checkbox-page col-auto pa-0 py-1">
          <v-checkbox
            v-model="allCheckedPage"
            class="ma-0"
            label="Выбрать все на странице"
            hide-details="hide-details"
          />
        </div>
        <v-spacer />
        <div class="sort-positions col-auto">
          Сортировать
          <b>
            по наименованию
          </b>
          <SvgIcon
            name="arrow-down"
          />
          по цене
        </div>
      </div>
      <template v-if="dataView === 'list-big'">
        <div class="grid-table--body">
          <div
            v-for="(i, k) in items"
            :key="k"
            class="grid-item row"
          >
            <div class="col-a ma-auto">
              <v-checkbox
                v-model="i.__checked"
                class="ma-0 pa-0"
                hide-details="hide-details"
              />
              <a
                href="@set-favorite"
                @click.prevent="i.__favorite = !i.__favorite"
              >
                <SvgIcon
                  class="item-favorite"
                  :name="i.__favorite ? 'starred-filled' : 'starred'"
                />
              </a>
            </div>
            <div class="item-logo col-a d-flex align-center">
              <template v-if="random(0, 1)">
                <img src="@/assets/images/test-position-tv.jpg" />
              </template>
              <SvgIcon
                v-else
                name="empty-image-mini"
                original
              />
            </div>
            <div class="col-a ma-auto">
              <div class="item-title">
                {{ i.name }}
              </div>
              <div class="item-description">
                {{ i.specifications }}
              </div>
            </div>
            <v-spacer />
            <div class="item-price col-2 ma-auto">
              от 3 223 888,00 ₽
              <span class="for-unit">
                 за шт
              </span>
            </div>
            <div class="item-actions col-a ma-auto">
              <v-btn
                class="ml-2"
                depressed
              >
                Добавить в ЦЗ
              </v-btn>
              <dropdown
                class="d-inline-flex"
                button-class="button-also ml-2"
                :button-color="null"
                depressed
                min-width="265"
                outlined
                whole
              >
                ...
                <template v-slot:dropdown-content>
                  <dropdown-item @click.prevent.native="manualModalVisible = true">
                    <SvgIcon
                      name="eye"
                      original
                    />
                    Сделать позицию невидимой
                  </dropdown-item>
                  <dropdown-item>
                    <SvgIcon
                      name="edit"
                      original
                    />
                    Редактировать
                  </dropdown-item>
                  <dropdown-item>
                    <SvgIcon
                      name="copy"
                      original
                    />
                    Копировать
                  </dropdown-item>
                  <dropdown-item>
                    <SvgIcon
                      name="remove"
                      original
                    />
                    Удалить
                  </dropdown-item>
                </template>
              </dropdown>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="dataView === 'grid'">
        <div class="grid-table--body row">
          <div
            v-for="(i, k) in items"
            :key="k"
            class="grid-item col-4"
          >
            <div class="row">
              <v-checkbox
                v-model="i.__checked"
                class="ma-0 pa-0"
                hide-details="hide-details"
              />
              <a
                href="@set-favorite"
                @click.prevent="i.__favorite = !i.__favorite"
              >
                <SvgIcon
                  class="item-favorite"
                  :name="i.__favorite ? 'starred-filled' : 'starred'"
                />
              </a>
            </div>
            <div class="row item-logo">
              <template v-if="random(0, 1)">
                <img src="@/assets/images/test-position-tv.jpg" />
              </template>
              <SvgIcon
                v-else
                name="empty-image"
                original
              />
            </div>
            <div class="row item-price">
              от 3 223 888,00 ₽
              <span class="for-unit">
                 за шт
              </span>
            </div>
            <div class="row item-title">
              {{ i.name }}
            </div>
            <div class="row item-description">
              {{ i.specifications }}
            </div>
            <div class="row item-actions">
              <v-btn
                class="ml-2"
                depressed
              >
                Добавить в ЦЗ
              </v-btn>
              <dropdown
                button-class="button-also ml-2"
                :button-color="null"
                depressed
                min-width="265"
                outlined
                whole
              >
                ...
                <template v-slot:dropdown-content>
                  <dropdown-item @click.prevent.native="manualModalVisible = true">
                    <SvgIcon
                      name="eye"
                      original
                    />
                    Сделать позицию невидимой
                  </dropdown-item>
                  <dropdown-item>
                    <SvgIcon
                      name="edit"
                      original
                    />
                    Редактировать
                  </dropdown-item>
                  <dropdown-item>
                    <SvgIcon
                      name="copy"
                      original
                    />
                    Копировать
                  </dropdown-item>
                  <dropdown-item>
                    <SvgIcon
                      name="remove"
                      original
                    />
                    Удалить
                  </dropdown-item>
                </template>
              </dropdown>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { random } from 'lodash-es';
import Dropdown, { DropdownItem } from '@/components/common//Dropdown.vue';
import ManualUserPositionModal from '@/components/modals/ManualUserPositionModal.vue';
import MyPositionsModal from '@/components/modals/MyPositionsModal.vue';
import SvgIcon from '@/components/common/SvgIcon.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserPositions',
  components: {
    Dropdown,
    DropdownItem,
    ManualUserPositionModal,
    MyPositionsModal,
    SvgIcon,
  },
  props: {
    selected: {
      type: Array,
      default: () => [],
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    allChecked: false,
    allCheckedPage: false,
    items: [],
    positionModal: false,
    myPositionsModal: false,
    positionEdited: undefined,
  }),
  computed: {
    ...mapGetters(['dataView']),
    selectedItems: {
      get() {
        return this.selected;
      },
      set(val) {
        this.$emit('selection-changed', val);
      },
    },
    headers() {
      const headers = [{
        value: 'name',
        text: 'Наименование позиции контрагента',
      }, {
        value: 'okei',
        text: 'ЕИ',
        editable: true,
      }, {
        value: 'okpd2',
        text: 'ОКПД2',
        editable: true,
      }, {
        value: 'specifications',
        text: 'Характеристики',
        editable: true,
      }];

      if (this.editable) {
        headers.push({
          value: 'actions',
          text: 'Действия',
          width: '100px',
          align: 'center',
        });
      }

      return headers;
    },
  },
  watch: {
    positionModal(value) {
      if (!value) {
        this.resetPositionEdited();
      }
    },
  },
  created() {
    this.getPositions();
  },
  methods: {
    ...mapActions(['setDataView']),
    random,
    setView(viewMode) {
      this.setDataView(viewMode);
    },
    async getPositions() {
      const { data } = await this.$http.get('positions');
      data.forEach((item) => {
        /* eslint-disable no-param-reassign */
        item.__checked = false;
        item.__favorite = false;
        /* eslint-enable no-param-reassign */
      });

      this.items = data;
    },
    resetPositionEdited() {
      this.positionEdited = undefined;
    },
    showUpdateModal(item) {
      this.positionEdited = JSON.parse(JSON.stringify(item));
      this.positionModal = true;
    },
    onSubmit(data) {
      if (Array.isArray(data)) {
        data.forEach((it) => {
          this.prepareRequest(it);
        });
        return;
      }

      this.prepareRequest(data);
    },
    prepareRequest(data) {
      const params = {
        ...data,
        okpd2: data.okpd2.code,
        okei: data.okei.code,
      };

      if (this.positionEdited) {
        this.updatePosition(params);
        return;
      }

      this.createPosition(params);
    },
    async createPosition(params) {
      try {
        await this.$http.post('positions', params);
        this.getPositions();
        this.$toast.success('Позиция успешно добавлена');

        this.positionModal = false;
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    async updatePosition(params) {
      try {
        await this.$http.put(`/positions/${params.id}`, params);
        this.getPositions();
        this.$toast.success('Позиция успешно отредактирована');

        this.positionModal = false;
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    async clonePosition(id) {
      try {
        await this.$http.patch(`/positions/${id}/clone`);
        this.getPositions();
        this.$toast.success('Позиция успешно скопирована');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
    async removePosition(id) {
      try {
        await this.$http.patch(`positions/${id}/archive`);
        this.getPositions();
        this.$toast.success('Позиция успешно удалена');
      } catch (e) {
        this.$toast.danger(e.response.data.message);
      }
    },
  },
};
</script>

<style lang="scss">
  .view-setter {
    svg path {
      fill: #AABDCD;
    }
    &[disabled] {
      cursor: not-allowed;
      svg path {
        fill: #999;
      }
    }
    &.active {
      svg path {
        fill: #316DA4;
      }
    }
    + .view-setter {
      margin-left: .75em;
    }
    svg.svg-icon {
      width: 20px;
      height: 20px;
    }
  }
  .grid-table,
  .list-big-table {
    padding: 0 30px;
    .svg-icon--starred,
    .svg-icon--starred-filled {
      height: 16px;
      width: 16px;
    }
    .grid-table--header {
      font-weight: 300;
      font-size: 13px;
      border: 1px solid #DFE2E5;
      border-left: 0;
      border-right: 0;
      .svg-icon--arrow-down {
        width: 12px;
        height: 12px;
      }
      .favorite-all {
        cursor: pointer;
      }
    }
    .grid-table--body {
      .grid-item {
        .item-favorite {
          position: relative;
          bottom: -2px;
          cursor: pointer;
          // margin-left: .375em;
        }
        .item-logo {
          justify-content: center;
          .svg-icon--empty-image {
            margin: auto;
          }
        }
        .item-price {
          color: #316DA4;
          font-size: 18px;
          line-height: 24px;
          .for-unit {
            margin-left: .5em;
            font-weight: 300;
            font-size: 12px;
            line-height: 19px;
            color: #2E2E2E;
          }
        }
        .item-title {
          font-size: 13px;
          line-height: 19px;
          color: #242F38;
        }
        .item-description {
          font-weight: 300;
          font-size: 13px;
          line-height: 19px;
          color: #2E2E2E;
        }
        .item-actions {
          .button-also {
            padding: 0;
            min-width: 40px;
            border-color: #DFE2E5;
          }
          .dropdownItem .svg-icon {
            width: 16px;
            height: 13px;
            margin-right: 5px;
            color: #AABDCD;
          }
        }
      }
    }
  }
  .list-big-table {
    .grid-table--body {
      .item-favorite {
        position: relative;
        margin-top: .5em;
        left: 3px;
      }
      .item-logo {
        padding: 0 30px;
        height: 90px;
        width: 90px;
        box-sizing: content-box;
        img {
          max-height: 90px;
          max-width: 90px;
        }
        .svg-icon--empty-image-mini {
          width: 55px;
          height: 55px;
        }
      }
    }
  }
  .grid-table {
    .grid-table--body {
      .grid-item {
        height: 450px;
      }
      .item-logo {
        padding: 0 30px;
        min-height: 185px;
        img {
          max-height: 185px;
        }
        .svg-icon--empty-image {
          width: 85px;
          height: 85px;
        }
      }
      .item-actions {
        margin-top: 75px;
      }
    }
  }
</style>
