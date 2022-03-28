import axios from '../axios/axios.v1'
import store from '../store/index.js'

class UserService {
  /* istanbul ignore next */
  async signup (credentials) {
    try {
      const { data } = await axios.post('/user', credentials)
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
        if (res.data.status === 501) {
          return []
        }
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
      const config = {
        headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
      }
      const response = await axios.post('/following/unfollow', credentials, config)
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
      return response.data
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  /* istanbul ignore next */
  async getFollowNum (userID) {
    const result = { numFollowing: 0, numFollower: 0 }
    const config = {
      headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    }
    await axios
      .get('/following/followers/' + userID, config)
      .then(function (res) {
        result.numFollower = res.data.length
      })
      .catch(function (err) {
        console.log(err)
      })
    await axios
      .get('/following/follows/' + userID, config)
      .then(function (res) {
        result.numFollowing = res.data.length
      })
      .catch(function (err) {
        console.log(err)
      })
    return result
  }

  /* istanbul ignore next */
  async isFollowed (targetID) {
    console.log('USER SERVICE ' + targetID)
    console.log((store.state.user.following))
    console.log((store.state.user.following).includes(targetID))
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

  async getFollowingsRaw (userID) {
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
    return followingsData
  }

  async getFollowersRaw (userID) {
    let followersData = null
    const config = {
      headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    }
    await axios
      .get('/following/followers/' + userID,
        config)
      .then(function (res) {
        followersData = res.data
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    return followersData
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

  async getConversations (username) {
    let conversations = null
    await axios.get('/conversation/' + username)
      .then(function (res) {
        conversations = res.data.conversations
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    return conversations
  }

  async getMessages (conversationId) {
    let messages = null
    await axios.get('/message/' + conversationId)
      .then(function (res) {
        messages = res.data.messages
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    return messages
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

  async removeAlpaca (userId, store) {
    const response = await axios.patch('/userInfo/' + userId, {
      alpacaToken: 'None'
    })
    store
      .dispatch('update', {
        response
      })
      .catch(err => {
        this.error = err.response.data.message
      })
  }/* istanbul ignore next */

  async getActivities (userID) {
    let activities = null
    await axios
      .get('/activities/' + userID)
      .then(function (res) {
        activities = res.data.activities
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    return activities
  }

  async togglePrivacy (userId, store, isPrivate) {
    const response = await axios.patch(`/userInfo/${userId}`, {
      isPrivate: isPrivate
    })
    store.dispatch('update', {
      response
    }).catch(err => {
      this.error = err.response.data.message
    })
  }

  async getEquities (userId, period) {
    let history = null
    await axios.get('/history/' + userId + '?period=' + period)
      .then(function (res) {
        history = res.data.history
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    return history
  }
}

export default new UserService()
