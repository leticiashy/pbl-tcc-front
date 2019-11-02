// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueResource from "vue-resource";
import CxltToastr from "cxlt-vue2-toastr";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

import App from "@/App";
import store from "@/middlewares/store";
import router from "@/middlewares/router";
import i18n from "@/middlewares/i18n";
import ApiHttpInterceptor from "@/interceptors/ApiHttpInterceptor";

import "@/middlewares/vuetify";

import LanguagesMixin from "@/mixins/LanguagesMixin";

import FlashMessageService from "@/services/FlashMessageService";

Vue.mixin(LanguagesMixin);

Vue.use(CxltToastr, {
  position: "top full width",
  showDuration: 2000,
  timeOut: 8000,
  closeButton: true,
  progressBar: true
});

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
    Vue.$globalEvent.$on("httpError", error => {
      console.error(">> httpError <<", error);
      if (error) {
        if (error.status) {
          if (error.showException && error.status === 401) {
            if (error.body && error.body.detail) {
              FlashMessageService.error(error.body.detail);
            } else {
              FlashMessageService.error(
                this.$t("INFRA.HTTP.ACCESS_DENIED_MESSAGE")
              );
            }
            router.push("/login");
          } else if (error.showException && error.status === 403) {
            FlashMessageService.error(
              this.$t("INFRA.HTTP.ACCESS_DENIED_MESSAGE")
            );
            router.push("/login");
          } else if (error.showException && error.status === 412) {
            FlashMessageService.error(
              this.$t("INFRA.HTTP.SESSION_EXPIRED_MESSAGE")
            );
            router.push("/login");
          } else if (error.showException && error.status === 409) {
            FlashMessageService.warning(window.getMessage(error));
          } else if (
            error.showException &&
            (error.status >= 404 && error.status < 500)
          ) {
            FlashMessageService.warning(window.getMessage(error));
          } else if (error.status === 400 && error.showException) {
            FlashMessageService.warning(window.getMessage(error));
          } else if (error.showException) {
            FlashMessageService.error(window.getMessage(error), error);
          }
        } else {
          FlashMessageService.error(window.getMessage(error), error);
          console.error(
            `${error.operation} failed: ${window.getMessage(error)}`
          );
        }
      }
    });

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
