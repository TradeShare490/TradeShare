/* istanbul ignore file */
import UserService from '../services/User.service'
export const useFollowMixin = {
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
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
      console.log('FOLLOW')
      const credentials = {
        actorId: this.user.userId,
        targetId: this.id
      }
      try {
        const response = await UserService.postFollow(credentials)
        console.log(response)
        switch (type) {
          case 0: this.userStat.following = true; break
          case 1:
            this.otheruser.following = true
            this.otheruser.numFollowers++
            break
        }

        this.toogleSnackbar(0)
        this.user.following.push(this.id)
        this.$store.state.user.following.push(this.id)
        console.log('new this.$store.state.user.following')
        console.log(this.$store.state.user.following)
      } catch (e) {
        console.log(e)
      }
    },
    async unfollow (type) {
      console.log('UNFOLLOW')
      const credentials = {
        actorId: this.user.userId,
        targetId: this.id
      }
      console.log(credentials)
      try {
        const response = await UserService.postUnfollow(credentials)
        console.log(response)
        switch (type) {
          case 0: this.userStat.following = false; break
          case 1:
            this.otheruser.following = false
            this.otheruser.numFollowers--
            break
        }
        this.toogleSnackbar(1)
        const index = this.user.following.indexOf(this.id)
        const index2 = this.$store.state.user.following.indexOf(this.id)
        console.log(index)
        if (index > -1 && index2 > -1) {
          this.user.following.splice(index, 1)
          this.$store.state.user.following.splice(index2, 1)
        }
        console.log('new this.$store.state.user.following')
        console.log(this.$store.state.user.following)
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
