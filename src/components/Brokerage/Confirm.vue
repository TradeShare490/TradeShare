<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="800">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Confirm
        </v-card-title>

        <v-card-text>
          {{ code }}
        </v-card-text>
        <v-card-text>
          {{ user.userId }}
          {{ userInfo }}
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="accept">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import userService from "../../services/User.service";
export default {
  name: "Confirm",
  data() {
    return {
      code: this.$route.query.code,
      dialog: true,
      userInfo: null
    };
  },
  methods: {
    async accept() {
      const response = await userService.integrateAlpaca(
        this.code,
        this.user.userId
      );
      this.userInfo = response;
      this.$store
        .dispatch("update", {
          response
        })
        .then(() => {
          this.$router.push({ name: "Dashboard" });
        })
        .catch(err => {
          this.error = err.response.data.message;
        });
    }
  },
  computed: {
    user() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user;
    }
  }
};
</script>

<style scoped></style>