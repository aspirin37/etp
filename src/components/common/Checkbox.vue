<template>
  <label
    class="checkbox"
    :class="classList"
  >
    <input
      class="checkbox__input"
      :checked="value"
      v-bind="$attrs"
      type="checkbox"
      @change="updateInput"
    >
    <div class="checkbox__box"><SvgIcon
      class="checkbox__boxIcon"
      name="checkbox"
    /></div>
  </label>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon.vue';

export default ({
  name: 'Checkbox',
  components: {
    SvgIcon,
  },
  props: {
    size: {
      type: String,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classList() {
      const classList = [];
      if (this.size) {
        classList.push(`checkbox--${this.size}`);
      }

      return classList;
    },
  },
  methods: {
    updateInput(event) {
      const element = event.target;
      const isChecked = element.checked;

      this.$emit('input', isChecked);
    },
  },
});
</script>

<style lang="scss" scoped>
.checkbox {
  cursor: pointer;
  display: inline-block;

  &__input {
    display: none;

    &:checked {
      & + .checkbox__box {
        background-color: $blue;
        border-color: $blue;
      }
    }
  }

  &__box {
    align-items: center;
    background-color: $white;
    border: 1px solid #CED0DA;
    border-radius: 4px;
    color: $white;
    display: flex;
    justify-content: center;
  }

  &--sm & {
    &__box {
      height: 16px;
      width: 16px;
    }

    &__boxIcon {
      height: 10px;
      width: 12px;
    }
  }
}
</style>
