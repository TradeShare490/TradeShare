export const useFollowMixin = {
  methods: {
    async follow() {
      this.user.following = true;
    },
    async unfollow() {
      this.user.following = false;
    },
  },
};
