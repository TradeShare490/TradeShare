import axios from '../axios/axios.v1'
import store from '../store/index.js'

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
    console.log('GET POSITION ' + userID)
    let userPortfolioData = null
    await axios
      .get('/positions/' + userID)
      .then(function (res) {
        console.log('response')
        console.log(res)
        if (res.data.status === 501) {
          console.log('501!')
          return []
        }
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
    console.log('returning')
    console.log(userPortfolioData)
    return userPortfolioData
  }

  /* istanbul ignore next */
  async postUnfollow (credentials) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
      }
      const response = await axios.post('/following/unfollow', credentials, config)
      console.log('unfollowed')
      console.log(store.state.user)
      return response.data
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  /* istanbul ignore next */
  async postFollow (credentials) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
      }
      const response = await axios.post('/following/follow', credentials, config)
      console.log('followed')
      console.log(store.state.user)
      return response.data
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  /* istanbul ignore next */
  async getFollowNum (userID) {
    console.log('getFollowNum ' + userID)
    const result = { numFollowing: 0, numFollower: 0 }
    const config = { headers: { Authorization: `Bearer ${store.state.user.accessToken}` } }
    await axios
      .get('/following/followers/' + userID, config)
      .then(function (res) {
        console.log(res.data)
        result.numFollower = res.data.length
      })
      .catch(function (err) {
        console.log(err)
      })
    await axios
      .get('/following/follows/' + userID, config)
      .then(function (res) {
        console.log(res.data)
        result.numFollowing = res.data.length
      })
      .catch(function (err) {
        console.log(err)
      })
    console.log('before returning')
    console.log(result)
    return result
  }

  isFollowed (targetID) {
    console.log('IS FOLLOWED ' + targetID)
    // ${store.state.user.accessToken}
    console.log(store.state.user.following)
    console.log('isFollowing === ' + (store.state.user.following).includes(targetID))
    return (store.state.user.following).includes(targetID)
  }

  /* istanbul ignore next */
  async getFollowers (userID) {
    let followersData = null
    const config = {
      headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    }
    await axios
      .get('/following/followers/' + userID, config)
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
      .get('/following/follows/' + userID, config)
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
    const followingList = []
    let followingsData = null
    const config = {
      headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    }
    await axios
      .get('/following/follows/' + userID,
        config)
      .then(function (res) {
        followingsData = res.data
      })
      .catch(function (err) {
        console.log(err)
        return null
      })

    for (const user of followingsData) {
      let userInfo = null
      try {
        userInfo = await this.getUserInfo(user)
      } catch (err) {
        console.error(err)
      }
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
