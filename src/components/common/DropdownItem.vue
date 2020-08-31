<template>
  <div class="dropdownItem">
    <slot />
  </div>
</template>

<script>
export default ({
  name: 'DropdownItem',
});
</script>

<style lang="scss" scoped>
.dropdownItem {
  color: #2E2E2E;
  font: 300 13px/19px "Roboto";
  padding: 4.5px 17px;
}
</style>
