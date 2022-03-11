import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axios.v1'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    user: []
  },
  mutations: {
    setUserData (state, userData) {
      console.log('SETUSERDATA')
      console.log(userData)
      console.log(userData.accessToken)
      console.log(userData.userInfo.accessToken)
      console.log(userData.refreshToken)
      console.log(JSON.stringify(userData.userInfo))
      console.log(userData.userInfo.email)
      console.log(userData.userInfo.firstname)
      console.log(userData.userInfo)
      console.log(userData.userInfo.following[0])
      console.log(userData.userInfo.followers)

      state.user = { accessToken: userData.accessToken, following: userData.userInfo.following, followers: userData.userInfo.followers, ...userData.userInfo }
      userData.userInfo = { accessToken: userData.accessToken, following: userData.userInfo.following, followers: userData.userInfo.followers, ...userData.userInfo }
      localStorage.setItem('user', JSON.stringify(userData.userInfo))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.accessToken}`
      axios.defaults.headers.common['x-refresh'] = `${userData.refreshToken}`
      console.log('END setUserData')
      console.log('localstorage')
      console.log(JSON.parse(localStorage.getItem('user')))
      console.log('state user')
      console.log(state.user)
      state.user.follower_num = userData.userInfo.followers.length
      state.user.following_num = userData.userInfo.following.length
    },
    SET_FOLLOWER (state, data) {
      console.log('index.SET_FOLLOWER')
      state.user.follower_num = data
      console.log('end ' + state.user.follower_num)
    },
    SET_FOLLOWING (state, data) {
      console.log('index.SET_FOLLOWING')
      state.user.following_num = data
      console.log('end ' + state.user.following_num)
    },
    logOut () {
      localStorage.removeItem('user')
      location.reload()
    },
    updateUserData (state, userData) {
      localStorage.setItem('user', JSON.stringify(userData.response.data))
    }
  },
  actions: {
    async login ({ commit }, credentials) {
      const { data } = await axios.post('/session', credentials)
      await axios.get('/following/follows/' + data.userInfo.userId, { headers: { Authorization: `Bearer ${this.state.user.accessToken}` } })
        .then(response => {
          console.log('REPS FROM FOLLOWS')
          console.log(response.data)
          data.userInfo.following = response.data
        })
      await axios.get('/following/followers/' + data.userInfo.userId, { headers: { Authorization: `Bearer ${this.state.user.accessToken}` } })
        .then(response => {
          console.log('REPS FROM FOLLOWING')
          console.log(response.data)
          data.userInfo.followers = response.data
        })
      commit('setUserData', data)
    },
    getFollows (context, id) {
      console.log('getFollows')
      console.log(this.state)
      console.log(this.state.user)
      axios.get('/following/follows/' + id, { headers: { Authorization: `Bearer ${this.state.user.accessToken}` } })
        .then(response => {
          console.log(response.data)
          context.commit('SET_FOLLOWING', response.data.length)
        })
      // const url = '/following/follows/'
      // console.log(localStorage.getItem('user').accessToken)
      // console.log(localStorage.getItem('user').userId)
      // console.log(url + localStorage.getItem('user').userId)
      // const headers = {
      //   'x-api-key': process.env.VUE_APP_SIRH_X_API_KEY,
      //   Authorization: localStorage.getItem('user').accessToken
      // }
      // console.log(headers)
      // return axios({
      //   method: 'get',
      //   url: url + localStorage.getItem('user').userId,
      //   headers: headers
      // }).then((response) => {
      //   context.commit('SET_FOLLOWING', response.data.length)
      // }).catch((e) => {
      //   console.log(e)
      // })
    },
    getFollowers ({ commit }, id) {
      axios.get('/following/followers/' + id, { headers: { Authorization: `Bearer ${this.state.user.accessToken}` } })
        .then(response => {
          console.log(response.data)
          commit('SET_FOLLOWER', response.data.length)
        })
    },
    logout ({ commit }) {
      commit('logOut')
    },
    async update ({ commit }, info) {
      try {
        commit('updateUserData', info)
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    },
    f1: (state) => state.user.following_num,
    f2: (state) => state.user.follower_num,
    allPosts () {
      return [
        {
          id: 1,
          image: 'https://randomuser.me/api/portraits/men/35.jpg',
          name: 'Ash Britain',
          username: '@ashcoin63',
          when: '10min ago',
          purchased: true,
          company: 'Twitter Inc.',
          tag: 'TWTR',
          size: 50,
          verified: false,
          stock1: 312.92,
          stock2: '+0.52%',
          stock3: 311.7,
          stock4: 'Post+0.16%'
        },
        {
          id: 2,
          image: 'https://randomuser.me/api/portraits/men/52.jpg',
          name: 'Tim Robenman',
          username: '@timthetatman',
          when: '18h ago',
          purchased: false,
          company: 'NVIDIA Corp.',
          tag: 'NVDA',
          size: 150,
          verified: true,
          stock1: 222.42,
          stock2: '+0.41%',
          stock3: 222.7,
          stock4: 'Post+0.13%'
        },
        {
          id: 3,
          image: 'https://randomuser.me/api/portraits/men/86.jpg',
          name: 'Mac Kafe',
          username: '@mcafeez',
          when: 'Dec 10',
          purchased: true,
          company: 'Tesla Inc.',
          tag: 'TSLA',
          size: 1000,
          verified: true,
          stock1: 755.83,
          stock2: '+1.52%',
          stock3: 755.1,
          stock4: 'Post+0.91%'
        },
        {
          id: 4,
          image: 'https://randomuser.me/api/portraits/men/35.jpg',
          name: 'Ash Britain',
          username: '@ashcoin63',
          when: 'Dec 8',
          purchased: false,
          company: 'Voyager Digital Ltd.',
          tag: 'VYGR',
          size: 15,
          verified: false,
          stock1: 14.98,
          stock2: '-0.25%',
          stock3: 15.04,
          stock4: 'Post+0.19%'
        },
        {
          id: 5,
          image: 'https://randomuser.me/api/portraits/men/52.jpg',
          name: 'Tim Robenman',
          username: '@timthetatman',
          when: 'Nov 29',
          purchased: false,
          company: 'NVIDIA Corp.',
          tag: 'NVDA',
          size: 150,
          verified: true,
          stock1: 222.42,
          stock2: '+0.41%',
          stock3: 222.7,
          stock4: 'Post+0.13%'
        }
      ]
    }
  }
})
