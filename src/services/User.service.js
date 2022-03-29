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
  async getPositions (userId) {
    if (userId === undefined) return null
    console.log('getPositions ' + userId)
    let userPortfolioData = []
    await axios
      .get('/positions/' + userId)
      .then(function (res) {
        console.log(res)
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
      console.log(response.data)
      return { success: true }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  // TO-DO for private account
  /* istanbul ignore next */
  async postFollow (credentials) {
    console.log('service.postFollow')
    try {
      const config = {
        headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
      }
      const response = await axios.post('/following/follow', credentials, config)
      console.log(response.data)
      return { success: true }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  /* istanbul ignore next */
  async getFollowNum (userId) {
    const result = { numFollowing: 0, numFollower: 0 }
    const config = {
      headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    }
    await axios
      .get('/following/followers/' + userId, config)
      .then(function (res) {
        result.numFollower = res.data.length
      })
      .catch(function (err) {
        console.log(err)
      })
    await axios
      .get('/following/follows/' + userId, config)
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
    return (store.state.user.following).includes(targetID)
  }

  // TO-DO
  // REMOVE REQUEST TO ACCOUNT
  async removeFollowRequest (credentials) {
    console.log('service.removeFollowRequest')
    let requestListRaw = await this.getFollowRequestRaw(credentials.actorId)
    console.log(requestListRaw)
    console.log('removing ' + credentials.actorId)
    requestListRaw = requestListRaw.filter(function (item) {
      return item !== credentials.actorId
    })
    console.log(requestListRaw)
    // try {
    //   const config = {
    //     headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    //   }
    //   const response = await axios.post('URL', credentials, requestListRaw, config)
    // console.log(response.data)
    return { success: true }
    // } catch (err) {
    //   console.log(err)
    //   return { success: false, message: err.response.data.message }
    // }
  }

  // TO-DO
  // ADD REQUEST TO ACCOUNT
  async addFollowRequest (credentials) {
    console.log('service.addFollowRequest ' + credentials.targetId)
    const requestListRaw = await this.getFollowRequestRaw(credentials.targetId)
    console.log(requestListRaw)
    requestListRaw.unshift(credentials.actorId)
    console.log(requestListRaw)
    // try {
    //   const config = {
    //     headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    //   }
    //   const response = await axios.post('URL', credentials, requestListRaw, config)
    //   console.log(response.data)
    return { success: true }
    // } catch (err) {
    //   console.log(err)
    //   return { success: false, message: err.response.data.message }
    // }
  }

  async getFollowRequestRaw (userId) {
    // const requestListRaw = null
    // const config = {
    //   headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    // }
    // await axios
    //   .get('URL' + userId, config)
    //   .then(function (res) {
    //     requestListRaw = res.data
    //   })
    //   .catch(function (err) {
    //     console.log(err)
    //     return null
    //   })
    // return requestListRaw

    return ['id1', 'id2']
  }

  // TO-DO
  // GET LIST OF FOLLOW REQUEST
  async getFollowRequest (userId) {
    const config = {
      headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    }
    const requestListRaw = await this.getFollowRequestRaw(userId)
    const requestList = []
    for (const user of requestListRaw) {
      const userInfo = await this.getUserInfo(user)
      console.log(userInfo)
      const obj = { id: user, currentlyfollowing: false, firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, isPrivate: userInfo.isPrivate }
      requestList.push(obj)
    }

    let followingsData = null
    await axios
      .get('URL' + userId, config)
      .then(function (res) {
        followingsData = res.data
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    for (const id of followingsData) {
      for (const follower of requestList) {
        if (id.indexOf(follower.id) !== -1) {
          follower.currentlyfollowing = true
          break
        }
      }
    }
    return requestList
  }

  /* istanbul ignore next */
  async getFollowers (userId) {
    console.log('service.getFollowers ' + userId)
    let followersData = null
    const config = {
      headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    }
    console.log(config)
    await axios
      .get('/following/followers/' + userId, config)
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
      console.log(userInfo)
      const obj = { id: user, currentlyfollowing: false, firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, isPrivate: userInfo.isPrivate }
      followerList.push(obj)
    }

    let followingsData = null
    await axios
      .get('/following/follows/' + userId, config)
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

  async getFollowingsRaw (userId) {
    let followingsData = null
    const config = {
      headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    }
    await axios
      .get('/following/follows/' + userId,
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

  async getFollowersRaw (userId) {
    let followersData = null
    const config = {
      headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    }
    await axios
      .get('/following/followers/' + userId,
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
  async getFollowings (userId) {
    console.log('getFOllowings ')
    const followingList = []
    let followingsData = null
    const config = {
      headers: { Authorization: `Bearer ${store.state.user.accessToken}` }
    }
    await axios
      .get('/following/follows/' + userId,
        config)
      .then(function (res) {
        console.log(res.data)
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
        console.log(userInfo)
      } catch (err) {
        console.error(err)
      }
      const obj = { id: user, currentlyfollowing: true, firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, isPrivate: userInfo.isPrivate }
      followingList.push(obj)
    }
    console.log('returning')
    console.log(followingList)
    return followingList
  }

  /* istanbul ignore next */
  async getUserInfo (userId) {
    console.log('getUserInfo ' + userId)
    let userProfileData = null
    await axios
      .get('/userInfo/' + userId)
      .then(function (res) {
        console.log(res.data)
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
  async getAccount (userId) {
    let userAccountData = null
    await axios
      .get('/account/' + userId)
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

  async getActivities (userId) {
    let fetchActivities = []
    await axios
      .get('/activities/' + userId)
      .then(function (res) {
        if (res.data.status === 501) {
          return []
        } else {
          fetchActivities = res.data.activities
        }
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    return fetchActivities
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
