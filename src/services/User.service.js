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
		let userPortfolioData = axios
			.get("/positions/" + uID)
			.then(function (res) {
				console.log(res);
			})
			.catch(function (err) {
				console.log(err);
			})
			.then(function () {
				console.log("Reached then");
			});
		const { data } = userPortfolioData;
		userPortfolioData = JSON.parse(data);
		return userPortfolioData;
	}

	async pullUserProfileData(uID) {
		let userProfileData = axios
			.get("/userInfo/" + uID)
			.then(function (res) {
				console.log(res);
			})
			.catch(function (err) {
				console.log(err);
			})
			.then(function () {
				console.log("Reached then");
			});
		const { data } = userProfileData;
		userProfileData = JSON.parse(data);
		return userProfileData;
	}
}

export default new UserService()
