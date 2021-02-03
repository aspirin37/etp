<template>
  <v-navigation-drawer
    ref="navDrawer"
    class="app-sidebar"
    :class="{'once-opened': onceOpened}"
    :mini-variant.sync="mini"
    :mini-variant-width="80"
    :width="300"
    permanent
    clipped
    dark
    app
  >
    <div
      class="app-sidebar--hover-area"
      @mouseenter="mouseEnterDrawer"
      @mouseleave="mouseLeaveDrawer">
      <app-sidebar-logo :mini="mini" />
      <div class="app-sidebar__container">
        <app-sidebar-user :mini="mini" />
        <app-sidebar-navigation :mini="mini" />
      </div>
    </div>
    <a
      class="navigator-lock text-right mb-5"
      href="@lock"
      @click.prevent.stop="lock"
      @mouseleave="mouseLeaveLock"
    >
      <SvgIcon
        v-show="!navigatorLock"
        class="buttonIcon__lock"
        name="uplock"
      />
      <SvgIcon
        v-show="navigatorLock"
        class="buttonIcon__lock"
        name="lock"
      />
    </a>
  </v-navigation-drawer>
</template>

<script>
import AppSidebarNavigation from '@/components/layout/AppSidebarNavigation.vue';
import AppSidebarUser from '@/components/layout/AppSidebarUser.vue';
import AppSidebarLogo from '@/components/layout/AppSidebarLogo.vue';
import SvgIcon from '@/components/common/SvgIcon.vue';
import { mapActions, mapGetters } from 'vuex';
import parentsHasClass from '@/utilities/dom/parentsHasClass';

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarLogo,
    AppSidebarUser,
    AppSidebarNavigation,
    SvgIcon,
  },
  data: () => ({
    mini: true,
    onceOpened: false,
  }),
  computed: {
    ...mapGetters(['navigatorLock']),
  },
  watch: {
    mini(val) {
      if (!val) {
        this.onceOpened = true;
      }
    },
  },
  methods: {
    ...mapActions(['setNavigatorLock']),
    lock() {
      if (!this.$refs.navDrawer) return;

      const mode = !this.mini ? 'pinned' : 'unpinned';
      const locked = this.navigatorLock ? null : mode;
      this.setNavigatorLock(locked);
    },
    /* eslint-disable */
    mouseEnterDrawer() {
      if (!this.mini) return;
      if (this.navigatorLock) return;

      this.mini = false;
    },
    mouseLeaveDrawer(event) {
      if (this.navigatorLock === 'pinned') return;
      if (parentsHasClass(event.relatedTarget, 'navigator-lock')) return;

      this.mini = true;
    },
    mouseLeaveLock(event) {
      if (parentsHasClass(event.relatedTarget, 'app-sidebar--hover-area')) return;

      this.mouseLeaveDrawer(event);
    },
  },
  mounted() {
    if (this.navigatorLock === 'pinned') {
      this.mini = false;
    }
  },
};
</script>

<style lang="scss">
.v-application .app-sidebar {
  .app-sidebar--hover-area {
    height: calc(100vh - 64px);
  }
  .navigator-lock {
    margin-bottom: 0 !important;
    height: 64px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    padding-right: 26px;
  }
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
