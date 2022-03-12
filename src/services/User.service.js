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
  }
}

export default new UserService()
