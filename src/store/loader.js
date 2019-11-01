export const state = {
  loading: 0,
  longLoading: 0
};

export const mutations = {
  "loader/START_LOADING": function(state, payload) {
    if (payload.showLoading) {
      state.loading = state.loading + 1;
    }
  },
  "loader/FINISH_LOADING": function(state, payload) {
    if (payload.showLoading) {
      state.loading = state.loading - 1;
    }
  },
  "loader/START_LONG_LOADING": function(state) {
    state.longLoading = state.longLoading + 1;
  },
  "loader/FINISH_LONG_LOADING": function(state) {
    state.longLoading = state.longLoading - 1;
  }
};

export const actions = {
  startLongLoading: function(store) {
    store.commit("loader/START_LONG_LOADING");
  },
  stopLongLoading: function(store) {
    store.commit("loader/FINISH_LONG_LOADING");
  }
};
