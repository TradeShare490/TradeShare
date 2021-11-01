import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
		login({ commit }, credentials) {
			return axios.post("//localhost:5000/api/v1/session", credentials).then(({ data }) => {
				commit("setUserData", data);
			});
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
