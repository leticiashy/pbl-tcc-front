<template>
  <v-toolbar class="menu" color="gray darken-2" fixed dark app>
    <v-toolbar-title class="ml-0 pl-3 hidden-md-and-up">
      <v-toolbar-side-icon
        @click.stop="handleDrawerToggle"
      ></v-toolbar-side-icon>
    </v-toolbar-title>

    <v-list class="horizontal-list pa-1 hidden-sm-and-down">
      <v-list-tile
        v-for="(item, index) in items"
        v-show="item"
        :disabled="item.disabled"
        :key="index"
        :target="item.target"
        :to="item.path ? item.path : null"
        @click="item.click ? item.click : true"
        rel="noopener"
        ripple="ripple"
        style="background: transparent"
      >
        <v-list-tile-action v-if="item.action">
          <v-icon>{{ item.action }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.text }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-toolbar>
</template>
<script>
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
.menu {
  padding-left: 0px !important;
}

.horizontal-list {
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  background: transparent !important;
}

.horizontal-list .v-list__tile__action {
  display: flex;
  justify-content: center;
}

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

<style>
.horizontal-list.v-list div a.v-list__tile--link.theme--dark:hover {
  background: rgba(245, 245, 245, 0.15) !important;
}
</style>
