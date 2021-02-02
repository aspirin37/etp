<template>
  <div class="tableColumnSwitcher">
    <label
      v-for="(field, i) in value"
      :key="i"
      class="tableColumnSwitcher__field"
    >
      <div class="tableColumnSwitcher__fieldName">{{ field.label }}</div>
      <input
        class="tableColumnSwitcher__fieldInput"
        :checked="field._show !== false"
        type="checkbox"
        @change="onChange(field.key)"
      >
      <div class="tableColumnSwitcher__fieldStatus">
        <SvgIcon
          class="tableColumnSwitcher__fieldCheck"
          name="checkbox"
        />
      </div>
    </label>
  </div>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon.vue';

export default ({
  name: 'TableColumnSwitcher',
  components: {
    SvgIcon,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tempFields: [],
    };
  },
  watch: {
    value: {
      handler(value) {
        this.tempFields = JSON.parse(JSON.stringify(value));
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onChange(key) {
      const index = this.value
        .map((field) => field.key)
        .indexOf(key);
      if (index !== -1) {
        const newStatus = this.tempFields[index]._show !== false;
        this.tempFields[index]._show = !newStatus;
      }

      this.$emit('input', this.tempFields);
    },
  },
});
</script>

<style lang="scss" scoped>
.tableColumnSwitcher {
  color: $darkGray;
  font: 300 13px/41px "Roboto";

  &__field {
    cursor: pointer;
    align-items: center;
    display: flex;
  }

  &__fieldInput {
    display: none;

    &:checked {
      & + .tableColumnSwitcher__fieldStatus {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  &__fieldName {
    flex-grow: 1;
    white-space: nowrap;
  }

  &__fieldStatus {
    color: $blue;
    flex-shrink: 0;
    margin-left: 38px;
    opacity: 0;
    visibility: hidden;
  }

  &__fieldCheck {
    height: 10px;
    width: 12px;
  }
}
</style>
