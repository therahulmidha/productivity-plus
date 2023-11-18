import { createStore } from "vuex";
import auth from "./auth";
import { SHOW_LOADER_MUTATION } from "./constants";

export default createStore({
  modules: {
    auth,
  },
  state() {
    return {
      isLoading: false,
    };
  },
  mutations: {
    [SHOW_LOADER_MUTATION](state, payload) {
      state.isLoading = payload;
    },
  },
});
