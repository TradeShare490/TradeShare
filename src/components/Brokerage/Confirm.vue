<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="1000">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Click confirm to link your Alpaca account
        </v-card-title>
        <v-row>
          <v-col class="d-flex justify-center pa-5">
            <v-img src="../../assets/TradeShare.png" height="100px"
                   width="150px" contain></v-img>
          </v-col>
          <v-col class="d-flex justify-center pa-5">
            <v-img src="../../assets/Alpaca_Logo.png" height="100px"
                   width="100px" contain></v-img>
          </v-col>
        </v-row>

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
      return JSON.parse(localStorage.getItem("user"));
    }
  }
};
</script>
