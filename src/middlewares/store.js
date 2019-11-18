import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import * as Loader from "@/store/loader";
import * as Language from "@/store/language";
import * as User from "@/store/user";

Vue.use(Vuex);

window.Vue = Vue;

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  state: Object.assign({}, Loader.state, Language.state, User.state),
  mutations: Object.assign(
    {},
    Loader.mutations,
    Language.mutations,
    User.mutations,
    {
      "application/LOAD_APPLICATION_BEGIN": function() {
        window.__appStore.commit("user/LOAD_DATA");
        window.__appStore.commit("language/LOAD_DATA");
      },
      "application/LOAD_APPLICATION_END": function() {},
    }
  ),
  actions: Object.assign(
    {},
    Loader.actions,
    Language.actions,
    User.actions,
    {}
  ),
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

window.__appStore = store;

export default store;
