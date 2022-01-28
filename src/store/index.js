import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios/axios.v1";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUserData(state, userData) {
      localStorage.setItem("user", JSON.stringify(userData.userInfo));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.accessToken}`;
      axios.defaults.headers.common["x-refresh"] = `${userData.refreshToken}`;
      state.user = userData.userInfo;
    },
    logOut() {
      localStorage.removeItem("user");
      location.reload();
    },
    updateUserData(state, userData) {
      localStorage.setItem("user", JSON.stringify(userData.response.data));
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const { data } = await axios.post("/session", credentials);
      commit("setUserData", data);
    },
    logout({ commit }) {
      commit("logOut");
    },
    async update({ commit }, info) {
      try {
        commit("updateUserData", info);
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    }
  }
});
