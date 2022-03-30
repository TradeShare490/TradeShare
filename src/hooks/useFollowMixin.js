/* istanbul ignore file */
import UserService from '../services/User.service'
export const useFollowMixin = {
  data () {
    return {
    }
  },
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async refreshFollowList (id) {
      this.$store.state.user.following = await UserService.getFollowingsRaw(id)
      this.$store.state.user.followers = await UserService.getFollowersRaw(id)
    },
    async getFollowingsHook (id) {
      this.isLoadingFollowing = true
      try {
        this.followings = await UserService.getFollowings(id)
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoadingFollowing = false
      }
    },
    async getFollowersHook (id) {
      this.isLoadingFollower = true
      try {
        this.followers = await UserService.getFollowers(id)
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoadingFollower = false
      }
    },

    async getFollowRequestHook (id) {
      this.isLoading = true
      try {
        this.requests = await UserService.getFollowRequest(id)
      } catch (err) {
        console.log(err)
        this.toogleSnackbar('Failed to perform action', 'error')
      } finally {
        this.isLoading = false
      }
    },

    async sendFollowRequest () {
      const credentials = {
        actorId: this.user.userId,
        targetId: this.id,
        bypassPrivate: false
      }
      try {
        const response = await UserService.addFollowRequest(credentials)
        if (response.success) {
          this.toogleSnackbar('Sent follow request to ' + this.name)
        }
      } catch (err) {
        console.log(err)
        this.toogleSnackbar('Failed to perform action', 'error')
      } finally {
        this.userStat.sentFollowRequest = true
      }
    },

    async rejectFollowPrivate (requestId) {
      const credentials = {
        actorId: this.id,
        targetId: this.user.userId,
        bypassPrivate: true
      }
      try {
        const response = await UserService.rejectFollowRequest(credentials, requestId)
        if (response.success) {
          this.requestStatusFinish = true
          this.toogleSnackbar('Rejected request')
        }
      } catch (e) {
        console.log(e)
        this.toogleSnackbar('Failed to perform action', 'error')
      }
    },

    async approveFollowPrivate (requestId) {
      const credentials = {
        actorId: this.id,
        targetId: this.user.userId,
        bypassPrivate: true
      }
      try {
        const response = await UserService.acceptFollowRequest(credentials, requestId)
        if (response.success) {
          this.user.followers.push(this.id)
          this.$store.state.user.followers.push(this.id)
          const lsUser = JSON.parse(localStorage.getItem('user'))
          if (lsUser.followers.indexOf(this.id) === -1) lsUser.followers.push(this.id)
          localStorage.setItem('user', JSON.stringify(lsUser))
          this.getFollowersHook(this.$store.state.user.userId)
          this.requestStatusFinish = true
          this.$router.go()
          this.toogleSnackbar('Approved request')
        }
      } catch (e) {
        console.log(e)
        this.toogleSnackbar('Failed to perform action', 'error')
      }
    },

    async follow (type) {
      const credentials = {
        actorId: this.user.userId,
        targetId: this.id,
        bypassPrivate: true
      }
      try {
        const response = await UserService.postFollow(credentials)
        if (response.success) {
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
          this.toogleSnackbar('Followed ' + this.name)
        }
      } catch (e) {
        console.log(e)
        this.toogleSnackbar('Failed to perform action', 'error')
      }
    },

    async unfollow (type) {
      const credentials = {
        actorId: this.user.userId,
        targetId: this.id
      }
      try {
        const response = await UserService.postUnfollow(credentials)
        if (response.success) {
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
          this.toogleSnackbar('Unfollowed ' + this.name)
        }
      } catch (e) {
        console.log(e)
        this.toogleSnackbar('Failed to perform action', 'error')
      }
    },

    toogleSnackbar (text, color, time) {
      this.snackbarText = (text)
      if (color) this.snackbarColor = color
      if (time) this.snackbarTimeout = time
      this.snackbarFollow = true
    }
  }
}
