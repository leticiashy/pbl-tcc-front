import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
  options: {
    themeVariations: ["primary", "secondary", "accent"],
    extra: {
      mainToolbar: {
        color: "primary",
      },
      sideToolbar: {},
      sideNav: "primary",
      mainNav: "primary lighten-1",
      bodyBg: "#fafafa",
    },
  },
});

module.export = Vuetify;
