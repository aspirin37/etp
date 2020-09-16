<template>
  <v-navigation-drawer
    class="app-sidebar"
    expand-on-hover
    :mini-variant.sync="mini"
    :mini-variant-width="80"
    :width="300"
    permanent
    clipped
    dark
    app
  >
    <app-sidebar-logo :mini="mini" />
    <div class="app-sidebar__container">
      <app-sidebar-user :mini="mini" />
      <app-sidebar-navigation :mini="mini" />
    </div>
  </v-navigation-drawer>
</template>

<script>
import AppSidebarNavigation from '@/components/layout/AppSidebarNavigation.vue';
import AppSidebarUser from '@/components/layout/AppSidebarUser.vue';
import AppSidebarLogo from '@/components/layout/AppSidebarLogo.vue';

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarLogo,
    AppSidebarUser,
    AppSidebarNavigation,
  },
  data: () => ({
    mini: true,
  }),
};
</script>

<style lang="scss">
.v-application .app-sidebar {
  .v-expansion-panel {
    background: transparent !important;
  }

  .v-expansion-panel-header {
    padding: 0 !important;
    min-height: auto !important;
  }

  .v-expansion-panel-content__wrap {
    padding-bottom: 0 !important;
  }

  &__container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background: rgba(255,255,255, 0.1);
    }

    &::-webkit-scrollbar-thumb {
      background: #cdcdcd;
    }
  }

  &__link {
    display: block;
    font-size: 14px;
    line-height: 21px;
    text-decoration: none;
    color: white;
    cursor: pointer;

    &--sub {
      margin-top: 19px;

      &:first-child {
        margin-top: 27px;
      }
    }

    &.router-link-active {
      color: $orange !important;
    }
  }
}
</style>
