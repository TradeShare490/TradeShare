import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios/axios.v1"

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
	},
	mutations: {
		setUserData(state, userData) {
			localStorage.setItem("user", JSON.stringify(userData));
			axios.defaults.headers.common["Authorization"] = `Bearer ${userData.accessToken}`;
			axios.defaults.headers.common["x-refresh"] = `${userData.refreshToken}`;
			state.user = userData.userInfo;
		},
		logOut() {
			localStorage.removeItem("user");
			location.reload();
		},
	},
	actions: {
		async login({ commit }, credentials) {
			const { data } = await axios.post("/session", credentials);
			commit("setUserData", data);
		},
		logout({ commit }) {
			commit("logOut");
		},
	},
	getters: {
		loggedIn(state) {
			return !!state.user;
		},
	},
});
