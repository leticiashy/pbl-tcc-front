<template>
  <v-toolbar color="primary" fixed dark app>
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon
        @click.stop="handleDrawerToggle"
      ></v-toolbar-side-icon>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>

    <!-- <language-changer /> -->

    <v-menu
      offset-y
      origin="center center"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <v-btn icon flat slot="activator">
        <v-avatar size="30px">
          <img src="@/assets/img/user.png" alt="user" />
        </v-avatar>
      </v-btn>
      <v-list class="pa-0">
        <v-list-tile
          v-for="(item, index) in items"
          :disabled="item.disabled"
          :href="item.href"
          :key="index"
          :target="item.target"
          :to="!item.href ? { name: item.name } : null"
          @click="item.click"
          rel="noopener"
          ripple="ripple"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import Helpers from "@/helpers";
import LanguageChanger from "@/components/shared/ui/LanguageChanger";
import store from "@/middlewares/store";

export default {
  components: {
    LanguageChanger
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    },
    items() {
      return [
        {
          icon: "account_circle",
          href: "/login",
          title: this.$t("GLOBAL.LOGOUT"),
          click: () => {
            store.commit("user/LOG_OUT");
            window.getApp.$emit("APP_LOGOUT");
          }
        }
      ];
    }
  },
  methods: {
    handleDrawerToggle() {
      window.getApp.$emit("APP_DRAWER_TOGGLED");
    },
    handleFullScreen() {
      Helpers.toggleFullScreen();
    }
  }
};
</script>

<style scoped>
.flags {
  min-width: 30px;
  max-width: 30px;
}
.flag-title {
  height: 100%;
  padding: 0 12px !important;
  align-items: center;
  display: flex;
}
</style>
