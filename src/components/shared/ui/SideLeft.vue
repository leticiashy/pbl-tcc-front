<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    v-model="drawer"
    width="260"
  >
    <v-toolbar color="primary darken-1" dark>
      <h1>LOGO</h1>
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down"></span>
      </v-toolbar-title>
    </v-toolbar>
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
  computed: {
    computeGroupActive() {
      return true;
    },
    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav;
    },
    items() {
      return [
        {
          path: "/resume",
          title: this.$t("GLOBAL.RESUME"),
          action: "ti-home"
        },

        {
          path: "",
          title: this.$t("GLOBAL.USER_SECTION"),
          action: "ti-user",
          items: [
            this.canShow(["admin", "manager"]) && {
              path: "/users/list",
              text: this.$t("GLOBAL.LIST_USER")
            },
            this.canShow(["admin", "manager", "user"]) && {
              path: "/users/profile",
              text: this.$t("GLOBAL.PROFILE_USER")
            }
          ]
        },

        {
          path: "",
          title: this.$t("GLOBAL.EVENT_SECTION"),
          action: "ti-agenda",
          items: [
            this.canShow(["admin", "manager", "user"]) && {
              path: "/events/list",
              text: this.$t("GLOBAL.LIST_EVENT")
            },
            this.canShow(["admin", "manager"]) && {
              path: "/events/add",
              text: this.$t("GLOBAL.PROFILE_EVENT")
            }
          ]
        }
      ];
    }
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
