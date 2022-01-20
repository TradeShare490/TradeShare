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
  },
};
