/* istanbul ignore file */
import UserService from '../services/User.service'
export const useFollowMixin = {
  data () {
    return {
      snackbarFollow: false,
      snackbarText: 'snackbarText',
      snackbarColor: 'primary',
      snackbarTimeout: 1000
    }
  },
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async getFollowingsHook () {
      try {
        this.followings = await UserService.getFollowings(this.user.userId)
      } catch (err) {
        console.log(err)
      }
    },
    async getFollowersHook () {
      console.log('sup')
      try {
        this.followers = await UserService.getFollowers(this.user.userId)
      } catch (err) {
        console.log(err)
      }
    },
    async follow () {
      const credentials = {
        actorId: this.user.userId,
        targetId: this.id
      }
      try {
        const response = await UserService.postFollow(credentials)
        console.log(response)
        this.userStat.following = true
        this.toogleSnackbar(0)
      } catch (e) {
        console.log(e)
      }
    },
    async unfollow () {
      const credentials = {
        actorId: this.user.userId,
        targetId: this.id
      }
      try {
        const response = await UserService.postUnfollow(credentials)
        console.log(response)
        this.userStat.following = false
        this.toogleSnackbar(1)
      } catch (e) {
        console.log(e)
      }
    },
    async confirmFollowRequest () {
      console.log('accepting follow request...')
    },
    async rejectFollowRequest () {
      console.log('rejecting follow request...')
      const response = true
      if (response) {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    toogleSnackbar (status) {
      console.log(status)
      if (status === 0) {
        this.snackbarText = ('Followed ' + this.name)
      } else {
        this.snackbarText = ('Unfollowed ' + this.name)
      }
      this.snackbarFollow = true
    }
  }
}
