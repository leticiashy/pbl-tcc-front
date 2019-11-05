<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    app
    v-model="drawer"
    width="260"
    v-if="items.length"
  >
    <vue-perfect-scrollbar
      class="drawer-menu--scroll"
      :settings="scrollSettings"
    >
      <v-list>
        <v-list-group
          v-for="item in items"
          v-model="item.active"
          :class="{ 'no-activator': !item.items }"
          :key="item.title"
          :prepend-icon="item.action"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title v-if="item.items">{{
              item.title
            }}</v-list-tile-title>

            <v-list-tile-title v-else @click="$router.push(item.path)">{{
              item.title
            }}</v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-for="subItem in item.items" :key="subItem.title">
            <v-list-tile-title
              class="sideleft"
              @click="$router.push(subItem.path)"
              >{{ subItem.text }}</v-list-tile-title
            >
          </v-list-tile>
        </v-list-group>
      </v-list>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      mini: false,
      drawer: true,
      scrollSettings: {
        maxScrollbarLength: 160
      }
    };
  },
  created() {
    window.getApp.$on("APP_DRAWER_TOGGLED", () => {
      this.drawer = !this.drawer;
    });
  }
};
</script>
<style>
#appDrawer {
  overflow: hidden;
  cursor: pointer;
}
.drawer-menu--scroll {
  height: calc(100vh - 48px);
  overflow: auto;
  cursor: pointer;
}
.logo {
  width: 60% !important;
  width: 100% !important;
  display: flex;
  justify-content: center;
  margin: 0 !important;
  align-content: center;
  align-items: center;
}
.sideleft {
  margin-left: 45px;
}
.no-activator .v-list__group__header__append-icon {
  display: none !important;
}
</style>
