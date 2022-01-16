<template>
  <v-container class="justify-center align-center mt-13 px-16 mx-auto">
    <v-card elevation="0" class="px-2">
      <v-img
        src="../../assets/TradeShare.png"
        alt="TradeShare Logo"
        max-width="150"
        class="mx-auto mb-3"
      ></v-img>
      <p
        class="text-xl-body-1 text-lg-body-1 text-md-body-1 text-sm-body-1 text-body-2 py-3 pb-5"
      >
        {{ intro_message }}
      </p>
      <v-card elevation="0" class="d-flex justify-center align-center">
        <v-form ref="formBrokerage" v-model="valid" data-cy="brokerage-form">
          <v-select
            v-model="select"
            :items="items"
            label="Select"
            return-object
            data-cy="brokerage-dropdown"
          ></v-select>

          <v-btn
            width="250"
            height="45"
            color="primary"
            class="my-3 text-button"
            @click="redirect"
            >Next</v-btn
          >
          <p left class="text-body-2 text-right pt-3">
            <router-link to="/dashboard">Skip for now</router-link>
          </p>
        </v-form>
      </v-card>
      <p
        class="text--secondary text-xl-body-2 text-lg-body-2 text-md-body-2 text-sm-body-2 text-caption py-3"
      >
        {{ no_brokerage_text }}
      </p>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Brokerage",
  data: () => ({
    valid: true,
    email: "",
    select: "Alpaca",
    items: ["Alpaca"],
    intro_message:
      "The best way to use TradeShare is to link your brokerage account so that we take care of keeping your dashboard up to date automatically.",
    no_brokerage_text:
      "Don’t have a brokerage service? No problem! You can still use TradeShare, you’ll just need to manually add your activity.",
    rules: {
      required: v => !!v || "Required"
    },
    rulesEmail: {
      format: v =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid"
    },
    user() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user["userInfo"];
    },
    alpacaURL: process.env.VUE_APP_ALPACA_INTEGRATION_URL
  }),
  methods: {
    submit() {
      // add check to see if contents are undefined
      if (this.$refs.formBrokerage.validate()) {
        console.log("Brokerage: ", this.select, "\n", "Email: ", this.email);
      }
    },
    redirect() {
      window.open(this.alpacaURL, "_self");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  width: 400px;
}
</style>