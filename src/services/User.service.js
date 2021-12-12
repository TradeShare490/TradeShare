import axios from "../axios/axios.v1";

class UserService {
	constructor() {}

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

	async integrateAlpaca(code,userId) {
		try {
			const { data } = await axios.patch("/userInfo/alpaca/"+ userId, {"code": code});
			console.log(data.message);

			// should be a good response here, but double check for sure
			return { data };
		} catch (err) {
			console.log(err);
			return { success: false, message: err.response.data.message };
		}
	}


}

export default new UserService()
