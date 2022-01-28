export const useFollowMixin = {
  methods: {
    async follow() {
      console.log("following...");
      this.following = true;
      console.log("followed");
    },
    async unfollow() {
      console.log("unfollowing...");
      this.following = false;
      console.log("unfollowed");
    },
    async confirmFollowRequest() {
      console.log("accepting follow request...");
    },
    async rejectFollowRequest() {
      console.log("rejecting follow request...");
      let response = true;
      if (response) {
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }
    },
  },
};
