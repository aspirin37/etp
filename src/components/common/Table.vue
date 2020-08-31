<template>
  <div class="table">
    <div
      ref="scrollContainer"
      class="table__overlay"
    >
      <table class="table__tableElement">
        <thead class="table__thead">
          <tr>
            <template v-for="field in showFields">
              <!-- <Sticky
                v-if="field._sticky"
                :key="field.key"
                class="table__th table__th--sticky"
                :position="field._sticky"
                :style="field._style"
                tag="th"
              >
                <slot :name="`head(${field.key})`">
                  {{ field.label }}
                </slot>
              </Sticky> -->
              <th
                :key="field.key"
                class="table__th"
                :style="field._style"
              >
                <slot
                  :name="`head(${field.key})`"
                  :field="field"
                >
                  {{ field.label }}
                </slot>
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.id"
            class="table__row"
          >
            <template v-for="field in showFields">
              <!-- <Sticky
                v-if="field._sticky"
                :key="`${field.key}_${row.id}`"
                class="table__td table__td--sticky"
                :class="{ 'table__td--active': row._active || false }"
                :position="field._sticky"
                :style="field._style"
                tag="td"
              >
                <slot
                  :name="`cell(${field.key})`"
                  :row="row"
                >
                  {{ row[field.key] }}
                </slot>
              </Sticky> -->
              <td
                :key="`${field.key}_${row.id}`"
                class="table__td"
                :class="{ 'table__td--active': row._active || false }"
                :style="field._style"
              >
                <slot
                  :name="`cell(${field.key})`"
                  :row="row"
                >
                  {{ row[field.key] }}
                </slot>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Sticky(:position="{ bottom: '2px' }")
     TableScroll.table__scrollBar(:container="scrollContainer") -->
</template>

<script>
// import Sticky, { Position } from '@/components/Sticky.vue';
// import TableScroll from '@/components/TableScroll.vue';

export default ({
  name: 'Table',
  components: {
    // TableScroll,
    // Sticky,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      scrollContainer: null,
    };
  },
  computed: {
    showFields() {
      return this.fields.filter((field) => field._show !== false);
    },
  },
  mounted() {
    this.scrollContainer = this.$refs.scrollContainer;
  },
});
</script>

<style scoped lang="scss">
.table {
  position: relative;

  &__overlay {
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    width: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__tableElement {
    min-width: 100%;
  }

  &__th,
  &__td {
    background-color: $white;

    &--active {
      background-color: #E0E9F2;
    }
  }

  &__th {
    box-shadow:
      inset 0 -1px $borderColor,
      inset 0 1px $borderColor,
      inset 1px 0 $borderColor;
    color: $gray;
    font: normal 13px/15px "Roboto";
    padding: 16px 15px;
    vertical-align: middle;
    white-space: nowrap;

    &:first-child {
      box-shadow:
        inset 0 -1px $borderColor,
        inset 0 1px $borderColor;
    }
  }

  &__td {
    box-shadow: inset 0px -1px $borderColor;
    color: #2E2E2E;
    font: 300 13px/19px "Roboto";
    padding: 19px 15px;
  }

  &__scrollBar {
    margin-top: 2px;
  }
}
</style>
