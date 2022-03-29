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
      console.log(this.$store.state.user.following)
      console.log(this.$store.state.user.followers)
    },
    async getFollowingsHook (id) {
      console.log('getFollowingsHook ' + id)
      this.isLoadingFollowing = true
      console.log(this.isLoading + ' ----------------- >>> ')
      try {
        this.followings = await UserService.getFollowings(id)
        console.log('finish')
        console.log(this.followings)
      } catch (err) {
        console.log(err)
      } finally {
        console.log('end')
        this.isLoadingFollowing = false
        console.log(this.isLoading + ' <<< ----------------- >>> ')
      }
    },
    async getFollowersHook (id) {
      console.log('getFollowersHook ' + id)
      this.isLoadingFollower = true
      console.log(this.isLoading + ' ----------------- >>> ')
      try {
        this.followers = await UserService.getFollowers(id)
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoadingFollower = false
        console.log(this.isLoading + ' <<< ----------------- >>> ')
      }
    },
    // To-DO
    async getFollowRequestHook (id) {
      console.log('getFollowRequestHook ' + id)
      this.isLoading = true
      try {
        this.requests = await UserService.getFollowRequest(id)
        // this.requests = [
        //   { id: 'id1', currentlyfollowing: false, firstname: 'dummy1', lastname: 'dummy1', username: 'dummy1', isPrivate: false },
        //   { id: 'id2', currentlyfollowing: true, firstname: 'dummy2', lastname: 'dummy2', username: 'dummy2', isPrivate: true }
        // ]
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    // TO-DO verify credentials
    async sendFollowRequest () {
      console.log('=======\nmixin.sendFollowRequest')
      const credentials = {
        actorId: this.user.userId, // private account id
        targetId: this.id, // account that wants to follow
        bypassPrivate: false
      }
      console.log('credentials')
      console.log(credentials)
      try {
        const response = await UserService.addFollowRequest(credentials)
        console.log(response)
        if (response.success) {
          this.userStat.sentFollowRequest = true
          this.toogleSnackbar('Sent follow request to ' + this.name)
        }
      } catch (err) {
        console.log(err)
        this.toogleSnackbar('Failed to perform action', 'error')
      }
    },
    async removeFollowRequestHook (credentials) {
      try {
        const response1 = await UserService.removeFollowRequest(credentials)
        if (response1.success) {
          this.requestStatusFinish = true
          console.log('removed request')
          console.log(this.requestStatusFinish)
          // this.$destroy()
          // this.$el.parentNode.removeChild(this.$el)
        }
      } catch (err) {
        console.log(err)
        this.toogleSnackbar('Failed to perform action', 'error')
      }
    },

    async rejectFollowPrivate () {
      console.log('mixin.rejectFollowPrivate')
      const credentials = {
        actorId: this.id,
        targetId: this.user.userId
      }
      console.log(credentials)
      try {
        // this.user.following.push(this.id)
        // this.$store.state.user.following.push(this.id)
        // const lsUser = JSON.parse(localStorage.getItem('user'))
        // if (lsUser.following.indexOf(this.id) === -1) lsUser.following.push(this.id)
        // localStorage.setItem('user', JSON.stringify(lsUser))
        await this.removeFollowRequestHook(credentials)
        this.toogleSnackbar('Rejected request')
      } catch (e) {
        console.log(e)
        this.toogleSnackbar('Failed to perform action', 'error')
      }
    },
    // TO-DO
    async approveFollowPrivate () {
      console.log('mixin.followPrivate ')
      const credentials = {
        actorId: this.id,
        targetId: this.user.userId,
        bypassPrivate: true
      }
      console.log(credentials)
      try {
        // const response = await UserService.postFollow(credentials)
        // console.log(response)
        // if (response.success) {
        // eslint-disable-next-line no-constant-condition
        if (true) {
          // TO-DO MAKE BTN APPROVED
          // this.user.following.push(this.id)
          // this.$store.state.user.following.push(this.id)
          // const lsUser = JSON.parse(localStorage.getItem('user'))
          // if (lsUser.following.indexOf(this.id) === -1) lsUser.following.push(this.id)
          // localStorage.setItem('user', JSON.stringify(lsUser))
          this.removeFollowRequestHook(credentials)
          this.toogleSnackbar('Approved request')
        }
      } catch (e) {
        console.log(e)
        this.toogleSnackbar('Failed to perform action', 'error')
      }
    },

    async follow (type) {
      console.log('mixin.follow ' + type)
      const credentials = {
        actorId: this.user.userId,
        targetId: this.id,
        bypassPrivate: true
      }
      try {
        const response = await UserService.postFollow(credentials)
        console.log('return to mixin')
        console.log(response)
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

          console.log(this.user.following)
          console.log(this.$store.state.user.following)
          console.log(JSON.parse(localStorage.getItem('user')).following)
        }
        // this.user.following.push(this.id)
        // this.$store.state.user.following.push(this.id)
        // const lsUser = JSON.parse(localStorage.getItem('user'))
        // if (lsUser.following.indexOf(this.id) === -1) lsUser.following.push(this.id)
        // localStorage.setItem('user', JSON.stringify(lsUser))
        // this.toogleSnackbar(0, 'Followed ' + this.name)
        // this.$router.go()
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
          console.log(this.user.following)
          console.log(this.$store.state.user.following)
          console.log(JSON.parse(localStorage.getItem('user')).following)
        }
        // if (this.user.following.indexOf(this.id) > -1) {
        //   this.user.following.splice(this.user.following.indexOf(this.id), 1)
        // }
        // if (this.$store.state.user.following.indexOf(this.id) > -1) {
        //   this.$store.state.user.following.splice(this.$store.state.user.following.indexOf(this.id), 1)
        // }
        // const lsUser = JSON.parse(localStorage.getItem('user'))
        // if (lsUser.following.indexOf(this.id) !== -1) lsUser.following.splice(lsUser.following.indexOf(this.id), 1)
        // localStorage.setItem('user', JSON.stringify(lsUser))
        // this.toogleSnackbar('Unfollowed ' + this.name)
        // this.$router.go()
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
