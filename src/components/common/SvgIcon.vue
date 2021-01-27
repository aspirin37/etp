<template>
  <svg
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title v-if="title">{{ title }}</title>
    <use
      v-if="!original"
      :xlink:href="iconPath"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    />
    <svg
      v-else
      v-html="iconBody"
    />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    original: Boolean,
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    iconBody() {
      // eslint-disable-next-line
      const icon = require(`!!raw-loader!@/assets/icons/${this.name}.svg`);
      // console.log(icon);
      // return icon;
      return icon.default;
    },
    iconPath() {
      // eslint-disable-next-line
      let icon = require(`@/assets/icons/${this.name}.svg`);
      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default;
      }

      return icon.url;
    },
    className() {
      return `svg-icon svg-icon--${this.name}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .svg-icon {
    fill: none;
    height: 24px;
    width: 24px;

    &--create-price-request {
      height: 22px;
      width: 22px;
    }

    &--notification {
      height: 21px;
      width: 19px;
    }

    &--order-list {
      height: 23px;
      width: 18px;
    }

    &--price-request-list {
      height: 19px;
      width: 20px;
    }

    &--user-products {
      height: 21px;
      width: 17px;
    }

    &--collapse-icon {
      height: 7px;
      width: 13px;
    }
  }
</style>
