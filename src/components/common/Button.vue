<template>
  <button
    class="button"
    :class="classList"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>

export default ({
  name: 'Button',
  props: {
    variant: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
  },
  computed: {
    classList() {
      const classList = [];

      if (this.size) {
        classList.push(`button--${this.size}`);
      }

      if (this.variant) {
        classList.push(`button--${this.variant}`);
      }

      return classList;
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  background-color: $blue;
  border: none;
  border-radius: 4px;
  color: $white;
  font: 500 13px/40px "Roboto";
  height: 40px;
  padding: 0 25px;

  &--md {
    font-size: 14px;
    line-height: 50px;
    height: 50px;
    padding: 0 30px;
  }

  &--warning {
    background-color: $orange;
  }

  &:hover,
  &:active,
  &:focus {
    border: none;
    outline: none;
  }
}
</style>
