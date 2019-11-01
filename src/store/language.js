export const state = {
  globalLocale: null,
  actualLang: null
};

export const mutations = {
  "language/LOAD_DATA": function() {},
  "language/SET_LANGUAGE": function(state, payload) {
    state.actualLang = payload;
  },
  "language/SET_LOCALE": function(state, payload) {
    state.globalLocale = payload;
  }
};

export const actions = {
  setGlobalLocale: function(store, payload) {
    store.commit("language/SET_LOCALE", payload);
  },
  setActualLanguage: function(store, payload) {
    store.commit("language/SET_LANGUAGE", payload);
  }
};
