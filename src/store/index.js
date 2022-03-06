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
    user: null
  },
  mutations: {
    setUserData (state, userData) {
      state.user = { accessToken: userData.accessToken, ...userData.userInfo }
      userData.userInfo = { accessToken: userData.accessToken, ...userData.userInfo }
      localStorage.setItem('user', JSON.stringify(userData.userInfo))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.accessToken}`
      axios.defaults.headers.common['x-refresh'] = `${userData.refreshToken}`
    },
    async setFollow (state) {
      console.log('index.setFollows')
      const config = { headers: { Authorization: `Bearer ${state.user.accessToken}` } }
      await axios
        .get('/following/follows/' + state.user.userId, config)
        .then(function (res) {
          state.user.following_num = res.data.length
        })
        .catch(function (err) { console.log(err) })
      await axios
        .get('/following/followers/' + state.user.userId, config)
        .then(function (res) {
          state.user.follower_num = res.data.length
        })
        .catch(function (err) { console.log(err) })
      console.log('HEY')
      console.log(state.user.following_num)
      console.log(state.user.follower_num)
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
      commit('setUserData', data)
    },
    async getFollows ({ commit }) {
      commit('setFollow')
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
      console.log('getter')
      console.log(!!state.user)
      return !!state.user
    },
    f1: state => { return state.user.following_num },
    f2: state => { return 999 },
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
