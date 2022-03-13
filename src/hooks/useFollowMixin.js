/* istanbul ignore file */
import UserService from '../services/User.service'
export const useFollowMixin = {
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async refreshFollowList (id) {
      this.$store.state.user.following = await UserService.getFollowings(id)
      this.$store.state.user.followers = await UserService.getFollowers(id)
    },
    async getFollowingsHook (id) {
      this.isLoading = true
      try {
        this.followings = await UserService.getFollowings(id)
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    async getFollowersHook (id) {
      this.isLoading = true
      try {
        this.followers = await UserService.getFollowers(id)
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    async follow (type) {
      const credentials = {
        actorId: this.user.userId,
        targetId: this.id
      }
      try {
        await UserService.postFollow(credentials)
        switch (type) {
          case 0: this.userStat.following = true; break
          case 1:
            this.otheruser.following = true
            this.otheruser.numFollowers++
            break
        }
        this.user.following.push(this.id)
        this.$store.state.user.following.push(this.id)
        const lsUser = JSON.parse(localStorage.getItem('user'))
        if (lsUser.following.indexOf(this.id) === -1) lsUser.following.push(this.id)
        localStorage.setItem('user', JSON.stringify(lsUser))
        this.toogleSnackbar(0)
      } catch (e) {
        console.log(e)
      }
    },
    async unfollow (type) {
      const credentials = {
        actorId: this.user.userId,
        targetId: this.id
      }
      try {
        await UserService.postUnfollow(credentials)
        switch (type) {
          case 0: this.userStat.following = false; break
          case 1:
            this.otheruser.following = false
            this.otheruser.numFollowers--
            break
        }
        if (this.user.following.indexOf(this.id) > -1) {
          this.user.following.splice(this.user.following.indexOf(this.id), 1)
        }
        if (this.$store.state.user.following.indexOf(this.id) > -1) {
          this.$store.state.user.following.splice(this.$store.state.user.following.indexOf(this.id), 1)
        }
        const lsUser = JSON.parse(localStorage.getItem('user'))
        if (lsUser.following.indexOf(this.id) !== -1) lsUser.following.splice(lsUser.following.indexOf(this.id), 1)
        localStorage.setItem('user', JSON.stringify(lsUser))
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
      if (status === 0) {
        this.snackbarText = ('Followed ' + this.name)
      } else {
        this.snackbarText = ('Unfollowed ' + this.name)
      }
      this.snackbarFollow = true
    }
  }
}
