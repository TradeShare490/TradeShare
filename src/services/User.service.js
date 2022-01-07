import axios from "../axios/axios.v1";

class UserService {
	constructor() { }

	async signup(credentials) {
		try {
			const { data } = await axios.post("/user", credentials);
			console.log(data);

			// should be a good response here, but double check for sure
			return { success: data.success };
		} catch (err) {
			console.log(err);
			return { success: false, message: err.response.data.message };
		}
	}

	async pullUserPortfolioData(uID) {
		let userPortfolioData = null;
		await axios
			.get("/positions/" + uID)
			.then(function (res) {
				console.log(res);
				userPortfolioData = res;
			})
			.catch(function (err) {
				console.log(err);
				return null;
			})
			.then(function () {
				console.log("Reached then");
			});
		return userPortfolioData;
	}

	async pullUserProfileData(uID) {
		let userProfileData = null;
		await axios.get("/userInfo/" + uID)
			.then(function (res) {
				console.log("User info success");
				console.log(res);
				userProfileData = res;
			})
			.catch(function (err) {
				console.log(err);
				return null;
			})
			.then(function () {
				console.log("Reached then");
			});
		return userProfileData;
	}
}

export default new UserService()
