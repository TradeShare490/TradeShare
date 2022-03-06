import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axios.v1'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUserData (state, userData) {
      localStorage.setItem('user', JSON.stringify(userData.userInfo))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.accessToken}`
      axios.defaults.headers.common['x-refresh'] = `${userData.refreshToken}`
      state.user = userData.userInfo
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
    loginActivity () {
      return [
        {
          id: 1,
          device: 'Windows PC',
          location: 'Montreal, QC, Canada',
          browser: 'Chrome',
          when: '6 hours ago'
        },
        {
          id: 2,
          device: 'iPhone 12 Pro Max',
          location: 'Montreal, QC, Canada',
          browser: 'Safari',
          when: 'Jan 7'
        }
      ]
    },
    blockedUsers () {
      return [
        'userspam123',
        'userspam123456',
        'userspam123456789'
      ]
    },
    favoriteUsers () {
      return [
        'ashcoin63',
        'mcafeez',
        'timthetatman'
      ]
    },
    followersFollowing () {
      return [
        'Mary Winchester',
        'John Winchester',
        'Tim Robenman',
        'Ash Britan',
        'Mac Kafe'
      ]
    },
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
