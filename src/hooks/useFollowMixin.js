export const useFollowMixin = {
  methods: {
    async follow() {
      console.log("following...");
      //   try {
      //     await userFollow({
      //       target: id,
      //     });
      //   } catch {
      //     console.log("ERROR WHEN FOLLOWING");
      //   }
      this.following = true;
      console.log("followed");
    },
    async unfollow() {
      console.log("unfollowing...");
      //   try {
      //     await userUnfollow({
      //       target: id,
      //     });
      //   } catch {
      //     console.log("ERROR WHEN FOLLOWING");
      //   }
      this.following = false;
      console.log("unfollowed");
    },
  },
};
