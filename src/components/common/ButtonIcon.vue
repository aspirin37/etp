<template>
  <button
    class="buttonIcon"
    :class="classList"
  >
    <SvgIcon
      class="buttonIcon__icon"
      :class="`buttonIcon__icon--${iconName}`"
      :name="iconName"
    />
  </button>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon.vue';

export default ({
  name: 'ButtonIcon',
  components: {
    SvgIcon,
  },
  props: {
    iconName: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: '',
    },
  },
  computed: {
    classList() {
      const classList = [];

      if (this.size) {
        classList.push(`buttonIcon--${this.size}`);
      }

      if (this.variant) {
        classList.push(`buttonIcon--${this.variant}`);
      }

      return classList;
    },
  },
});
</script>

<style lang="scss" scoped>
.buttonIcon {
  background: none;
  border: none;
  color: #AABDCD;
  cursor: pointer;
  display: inline-block;
  padding: 0;
  position: relative;
  height: 40px;
  width: 40px;

  &__icon {
    display: block;
    max-width: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }

  &--sm {
    height: 20px;
    width: 20px;
  }

  &--sm & {
    &__icon {
      max-width: 15px;
    }
  }

  &--secondary {
    color: #E6E7E9;
  }
}
</style>
