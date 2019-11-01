<template>
  <v-menu
    offset-y
    origin="center center"
    :nudge-bottom="10"
    transition="scale-transition"
  >
    <v-btn icon flat slot="activator">
      <v-icon v-if="!actualLang.image">fa-globe</v-icon>
      <img
        v-else
        class="flags"
        :src="require(`@/assets/img/country-flags/${actualLang.image}.svg`)"
        alt=""
      />
    </v-btn>
    <v-list class="pa-0">
      <v-list-tile
        class="nav_submenu"
        v-for="lang in languages"
        v-bind:key="lang.code"
        @click="setLanguage(lang.code)"
      >
        <v-tooltip bottom>
          <template v-slot:activator="prop">
            <img
              class="flags"
              :src="require(`@/assets/img/country-flags/${lang.image}.svg`)"
              alt=""
            />
          </template>
        </v-tooltip>

        <v-list-tile-content>
          <v-list-tile-title class="flag-title pa-1">
            {{ lang.title }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
<script>
import Vue from "vue";
import LanguagesManager from "@/services/LanguagesManager";

export default {
  methods: {
    setLanguage(lang) {
      LanguagesManager.setLanguage(lang);
      localStorage.setItem("currentLang", lang);
      this.$i18n.locale = lang;
      Vue.$globalEvent.$emit("languageChanged", lang);

      this.$emit("input", lang);
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
