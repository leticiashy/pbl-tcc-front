export const state = {
  currentUser: null,
  currentEntity: null,
};

export const mutations = {
  "user/LOAD_DATA": function(state) {
    state.currentUser = localStorage.getItem("currentUser");
    state.currentEntity = localStorage.getItem("currentEntity");
  },
  "user/REDIRECTED_BY_SYSTEM": function(state) {
    state.currentUser = null;
    state.currentEntity = null;

    localStorage.setItem("currentUser", "");
    localStorage.setItem("currentEntity", "");
  },
  "user/LOG_OUT": function(state) {
    state.currentUser = null;
    state.currentEntity = null;

    localStorage.setItem("currentUser", "");
    localStorage.setItem("currentEntity", "");
  },
};

export const actions = {};
