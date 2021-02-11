<template>
  <div
    class="dropdown"
    :class="{ 'dropdown-whole': whole }"
  >
    <v-btn
      :class="buttonClass"
      :color="buttonColor"
      depressed
      v-bind="{ ...$attrs }"
      v-on="$listeners"
      @click.prevent="whole && open()"
    >
      <slot />
    </v-btn>
    <div
      v-if="!whole"
      class="dropdown__pointer"
      :class="classList"
      @click.prevent="open"
    >
      <svg-icon
        class="dropdown__pointerIcon"
        name="collapseIcon"
      />
    </div>
    <div
      class="dropdown__content"
      :class="{ 'dropdown__content--show': showContent }"
      :style="{ minWidth: `${minWidth}px` }"
      @click="onDropdownSelect"
    >
      <slot name="dropdown-content" />
    </div>
  </div>
</template>

<script>
// import Button from '@/components/common/Button.vue';
import SvgIcon from '@/components/common/SvgIcon.vue';
import DropdownItem from './DropdownItem.vue';

export default ({
  name: 'Dropdown',
  components: {
    // Button,
    SvgIcon,
  },
  props: {
    buttonClass: String,
    buttonColor: {
      type: String,
      default: 'accent',
    },
    minWidth: String,
    split: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: '',
    },
    whole: Boolean,
  },
  data() {
    return {
      showContent: false,
    };
  },
  computed: {
    classList() {
      return {
        [`dropdown__pointer--${this.variant}`]: true,
        'dropdown__pointer--active': this.showContent,
      };
    },
  },
  mounted() {
    document.addEventListener('click', this.onDocumentClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onDocumentClick);
  },
  methods: {
    open() {
      this.showContent = true;
    },
    onDocumentClick(e) {
      const { target } = e;
      if (target && !target.closest('.dropdown')) {
        this.showContent = false;
      }
    },
    onDropdownSelect() {
      this.$nextTick(() => {
        this.showContent = false;
      });
    },
  },
});

export { DropdownItem };

</script>

<style lang="scss" scoped>
.dropdown {
  cursor: pointer;
  display: flex;
  position: relative;

  &:not(.dropdown-whole) .v-btn {
    border-radius: 4px 0 0 4px;
  }

  &__pointer {
    align-items: center;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 0 4px 4px 0;
    display: flex;
    padding: 0 8px;

    &--active {
      .dropdown__pointerIcon {
        transform: rotate(-180deg);
      }
    }

    &--warning {
      background-color: $orange;
      color: $white;
    }
  }

  &__pointerIcon {
    transform-origin: center center;
    transition: transform 0.3s ease;
    height: 7px;
    width: 10px;
  }

  &__content {
    background: $white;
    border: 1px solid $lightBlue;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    opacity: 0;
    padding: 9px 0 10px;
    position: absolute;
    bottom: -5px;
    left: 0;
    transform: translateY(100%);
    transition: opacity 0.3s ease, visibility 0s ease 0.3s;
    visibility: hidden;
    width: 100%;
    z-index: 5;

    &--show {
      opacity: 1;
      transition-delay: 0s;
      visibility: visible;
    }
  }
}
</style>
