<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="470" >
      <v-card class="pt-5" >
        <v-card-title class="text-h6 justify-center" >
          Connect your {{ brokerageApp }} to TradeShare
        </v-card-title>
        <v-container>
          <v-row class="py-8">
            <v-spacer></v-spacer>
            <v-col class="d-flex justify-center py-5">
              <v-img
                src="../../assets/Alpaca_Logo.png"
                height="110px"
                width="100px"
                contain
              ></v-img>
            </v-col>
            <v-col class="d-flex justify-center py-5">
              <v-icon size="45" color="primary">
                east
              </v-icon>
            </v-col>
            <v-col class="d-flex justify-center py-5">
              <v-img
                src="../../assets/TradeShare.png"
                height="110px"
                width="100px"
                contain
              ></v-img>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
        <v-card-actions class="pb-5">
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancel" data-cy="cancel-linking-btn">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="accept" data-cy="confirm-linking-btn">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import userService from "../../services/User.service";
export default {
  name: "Confirm",
  props: {
    brokerageApp: String
  },
  /* istanbul ignore next */
  data() {
    return {
      code: this.$route.query.code,
      dialog: true,
      userInfo: null
    };
  },
  methods: {
    /* istanbul ignore next */
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
    },
    /* istanbul ignore next */
    async cancel() {
      await this.$router.push({ name: "Dashboard" });
    }
  },
  computed: {
    /* istanbul ignore next */
    user() {
      return JSON.parse(localStorage.getItem("user"));
    }
  }
};
</script>