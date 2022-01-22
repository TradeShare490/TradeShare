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

  async getPositions(userID) {
    let userPortfolioData = null;
    await axios
      .get("/positions/" + userID)
      .then(function(res) {
		res.data.positions.forEach(function(position){
          position.verified = true;
          position.date = new Date().toLocaleString();
        });
        userPortfolioData = res.data.positions
      })
      .catch(function(err) {
        console.log(err);
        return null;
      });

    return userPortfolioData;
  }

  async getUserInfo(userID) {
    let userProfileData = null;
    await axios
      .get("/userInfo/" + userID)
      .then(function(res) {
        // console.log("User info success");
        // console.log(res);
        userProfileData = res.data;
      })
      .catch(function(err) {
        console.log(err);
        return null;
      });
    return userProfileData;
  }
}

export default new UserService()
