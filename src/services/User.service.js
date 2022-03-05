import axios from '../axios/axios.v1'

class UserService {
  /* istanbul ignore next */
  async signup (credentials) {
    try {
      const { data } = await axios.post('/user', credentials)
      console.log(data)
      // should be a good response here, but double check for sure
      return { success: data.success }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  /* istanbul ignore next */
  async getPositions (userID) {
    let userPortfolioData = null
    await axios
      .get('/positions/' + userID)
      .then(function (res) {
        res.data.positions.forEach(function (position) {
          position.verified = true
          position.date = new Date().toLocaleString()
        })
        userPortfolioData = res.data.positions
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    return userPortfolioData
  }

  /* istanbul ignore next */
  async postUnfollow (credentials) {
    try {
      const response = await axios.post('/following/unfollow', credentials)
      return response.data
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  /* istanbul ignore next */
  async postFollow (credentials) {
    try {
      const response = await axios.post('/following/follow', credentials)
      return response.data
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  /* istanbul ignore next */
  async getFollowNum (userID) {
    console.log('getFollowNum')
    let followings = 0
    await axios
      .get('/following/followers_num/' + userID)
      .then(function (res) {
        console.log('1')
        console.log(res.data)
        followings = res.data.low
      })
      .catch(function (err) {
        console.log(err)
        return null
      })

    let followers = 0
    await axios
      .get('/following/follows_num/' + userID)
      .then(function (res) {
        console.log('2')
        console.log(res.data)
        followers = res.data.low
      })
      .catch(function (err) {
        console.log(err)
        return null
      })

    // let followings = 0
    // await axios
    //   .get('/following/follows/' + userID)
    //   .then(function (res) {
    //     followings = res.data.length
    //   })
    //   .catch(function (err) {
    //     console.log(err)
    //     return null
    //   })
    // let followers = 0
    // await axios
    //   .get('/following/followers/' + userID)
    //   .then(function (res2) {
    //     followers = res2.data.length
    //   })
    //   .catch(function (err2) {
    //     console.log(err2)
    //     return null
    //   })
    const values = { numFollowing: followings, numFollowers: followers }
    return values
  }

  /* istanbul ignore next */
  async getFollowers (userID) {
    let followersData = null
    await axios
      .get('/following/followers/' + userID)
      .then(function (res) {
        followersData = res.data
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    const followerList = []
    for (const user of followersData) {
      const userInfo = await this.getUserInfo(user)
      const obj = { id: user, currentlyfollowing: false, firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username }
      followerList.push(obj)
    }

    let followingsData = null
    await axios
      .get('/following/follows/' + userID)
      .then(function (res) {
        followingsData = res.data
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    for (const id of followingsData) {
      for (const follower of followerList) {
        if (id.indexOf(follower.id) !== -1) {
          follower.currentlyfollowing = true
          break
        }
      }
    }
    return followerList
  }

  /* istanbul ignore next */
  async getFollowings (userID) {
    let followingsData = null
    await axios
      .get('/following/follows/' + userID)
      .then(function (res) {
        followingsData = res.data
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    const followingList = []
    for (const user of followingsData) {
      const userInfo = await this.getUserInfo(user)
      const obj = { id: user, currentlyfollowing: true, firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username }
      followingList.push(obj)
    }
    return followingList
  }

  /* istanbul ignore next */
  async getUserInfo (userID) {
    let userProfileData = null
    await axios
      .get('/userInfo/' + userID)
      .then(function (res) {
        userProfileData = res.data
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    return userProfileData
  }

  /* istanbul ignore next */
  async getAccount (userID) {
    let userAccountData = null
    await axios
      .get('/account/' + userID)
      .then(function (res) {
        userAccountData = res.data.account
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    return userAccountData
  }

  /* istanbul ignore next */
  async integrateAlpaca (code, userId) {
    try {
      const { data } = await axios.patch('/userInfo/alpaca/' + userId, {
        code: code
      })
      console.log(data.message)

      // should be a good response here, but double check for sure
      return { data }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }
}

export default new UserService()
