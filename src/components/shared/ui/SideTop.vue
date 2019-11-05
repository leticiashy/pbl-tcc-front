<template>
  <v-toolbar color="purple darken-2" fixed dark app>
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>

    <!-- <v-layout row class="hidden-xs-only">
      <v-flex v-for="(item, index) in items" v-bind:key="index">
        <v-menu>
          <v-btn icon flat slot="activator">{{item.title}}</v-btn>
          <v-list class="pa-0">
            <v-list-tile v-for="subItem in item.items" :key="subItem.title">
              <v-list-tile-title
                class="sideleft"
                @click="$router.push(subItem.path)"
              >{{ subItem.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout> -->

    <v-spacer></v-spacer>

    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
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
          @click="item.click ? item.click : true"
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
import store from "@/middlewares/store";

export default {
  props: {
    items: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    handleDrawerToggle() {
      window.getApp.$emit("APP_DRAWER_TOGGLED");
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
