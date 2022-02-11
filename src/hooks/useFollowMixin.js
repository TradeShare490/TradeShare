/* istanbul ignore file */
export const useFollowMixin = {
  methods: {
    async follow () {
      this.user.following = true
    },
    async unfollow () {
      this.user.following = false
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
    }
  }
}
