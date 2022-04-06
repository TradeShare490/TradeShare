import axios from '../axios/axios.v1'

class UserService {
  /* istanbul ignore next */
  async signup (credentials) {
    try {
      const { data } = await axios.post('/user', credentials)
      return { success: data.success }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  /* istanbul ignore next */
  async getPositions (userId) {
    if (userId === undefined) return null
    let userPortfolioData = []
    await axios
      .get('/positions/' + userId)
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
      const response = await axios.post('/following/unfollow', credentials)
      if (response.status === 200) return { success: true }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  // TO-DO for private account
  /* istanbul ignore next */
  async postFollow (credentials) {
    try {
      const response = await axios.post('/following/follow', credentials)
      if (response.status === 200) return { success: true }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  /* istanbul ignore next */
  async getFollowNum (userId) {
    const result = { numFollowing: 0, numFollower: 0 }
    await axios
      .get('/following/followers/' + userId)
      .then(function (res) {
        result.numFollower = res.data.length
      })
      .catch(function (err) {
        console.log(err)
      })
    await axios
      .get('/following/follows/' + userId)
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
    return (JSON.parse(localStorage.getItem('user')).following).includes(targetID)
  }

  async addFollowRequest (credentials) {
    try {
      const response = await axios.post('/following/follow/', credentials)
      if (response.status === 200) return { success: true }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  async getFollowRequest (userId) {
    const response = await axios.get('/following/requests/' + userId)
    const requestList = []
    for (const user of response.data) {
      const userInfo = await this.getUserInfo(user.senderId)
      const obj = { requestId: user.relId, id: userInfo.userId, currentlyfollowing: false, firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, isPrivate: userInfo.isPrivate }
      requestList.push(obj)
    }
    return requestList
  }

  async acceptFollowRequest (credentials, requestId) {
    try {
      const response = await axios.post('/following/requests/accept/' + requestId, credentials)
      if (response.status === 200) return { success: true }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  async rejectFollowRequest (credentials, requestId) {
    try {
      const response = await axios.post('/following/requests/decline/' + requestId, credentials)
      if (response.status === 200) return { success: true }
    } catch (err) {
      console.log(err)
      return { success: false, message: err.response.data.message }
    }
  }

  /* istanbul ignore next */
  async getFollowers (userId) {
    let followersData = null
    await axios
      .get('/following/followers/' + userId)
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
      const obj = { id: user, currentlyfollowing: false, firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, isPrivate: userInfo.isPrivate }
      followerList.push(obj)
    }

    let followingsData = null
    await axios
      .get('/following/follows/' + userId)
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
    let followingsData = []
    await axios
      .get('/following/follows/' + userId)
      .then(function (res) {
        followingsData = res.data
      })
      .catch(function (err) {
        console.log(err)
      })
    return followingsData
  }

  async getFollowersRaw (userId) {
    let followersData = []
    await axios
      .get('/following/followers/' + userId)
      .then(function (res) {
        followersData = res.data
      })
      .catch(function (err) {
        console.log(err)
      })
    return followersData
  }

  /* istanbul ignore next */
  async getFollowings (userId) {
    const followingList = []
    let followingsData = null
    await axios
      .get('/following/follows/' + userId)
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
      const obj = { id: user, currentlyfollowing: true, firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username, isPrivate: userInfo.isPrivate }
      followingList.push(obj)
    }
    return followingList
  }

  async getBlockedUsers (userID, raw = false) {
    const blockedList = []
    let blockedData = null
    await axios
      .get('/managePrivacy/blockedUsers/' + userID)
      .then(function (res) {
        blockedData = res.data
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    if (raw) {
      return blockedData
    } else {
      for (const user of blockedData) {
        let userInfo = null
        try {
          userInfo = await this.getUserInfo(user)
        } catch (err) {
          console.error(err)
        }
        const obj = { id: user, firstname: userInfo.firstname, lastname: userInfo.lastname, username: userInfo.username }
        blockedList.push(obj)
      }
      return blockedList
    }
  }

  async unblockUser (credentials) {
    let success = false
    await axios
      .post('/managePrivacy/unblock/', credentials)
      .then(function (res) {
        success = res.status === 200
      })
      .catch(function (err) {
        console.log(err)
        success = false
      })
    return success
  }

  async blockUser (credentials) {
    let success = false
    await axios
      .post('/managePrivacy/block/', credentials)
      .then(function (res) {
        success = res.status === 200
      })
      .catch(function (err) {
        console.log(err)
        success = false
      })
    return success
  }

  /* istanbul ignore next */
  async getUserInfo (userId) {
    let userProfileData = null
    await axios
      .get('/userInfo/' + userId)
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
    let history = []
    await axios.get('/history/' + userId + '?period=' + period)
      .then(function (res) {
        if (res.status === 501) return []
        else history = res.data.history
      })
      .catch(function (err) {
        console.log(err)
        return null
      })
    return history
  }
}

export default new UserService()
