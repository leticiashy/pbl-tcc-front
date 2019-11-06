// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueResource from "vue-resource";

import App from "@/App";
import store from "@/middlewares/store";
import router from "@/middlewares/router";
import i18n from "@/middlewares/i18n";
import ApiHttpInterceptor from "@/interceptors/ApiHttpInterceptor";

import "@/middlewares/vuetify";

import LanguagesMixin from "@/mixins/LanguagesMixin";
import AuthMixin from "@/mixins/AuthMixin";

Vue.mixin(LanguagesMixin);
Vue.mixin(AuthMixin);

Vue.use(VueResource);
Vue.http.interceptors.push(ApiHttpInterceptor);

store.commit("application/LOAD_APPLICATION_BEGIN");
store.commit("loader/START_LONG_LOADING");

Vue.config.productionTip = false;

Vue.$globalEvent = new Vue();

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  components: {
    App
  },
  template: "<App/>",
  data: function() {
    return {
      timer: ""
    };
  },
  mounted() {
    store.commit("loader/FINISH_LONG_LOADING");
    store.commit("application/LOAD_APPLICATION_END");
  }
});

window.getMessage = error => {
  let msg = error.statusText || "Server not found";
  if (
    error.body &&
    error.body.body &&
    error.body.body &&
    Array.isArray(error.body.body) &&
    error.body.body.length > 0
  ) {
    if (error.body.body[0].message) {
      msg = error.body.body[0].message || error.body.body;
    }
  } else if (
    error.body &&
    error.body.body &&
    typeof error.body.body === "string"
  ) {
    msg = error.body.body;
  } else if (error.body && error.body.detail) {
    msg = error.body.detail;
  } else if (error.error && error.error.detail) {
    msg = error.error.detail;
  }

  return msg;
};
