<template>
  <div class="brokerage_page">
    <img src="../../assets/TradeShare.png" alt="TradeShare Logo" />
    <p id="brokerage_desc_text">
      The best way to use TradeShare is to link your brokerage account so that
      we take care of keeping your dashboard up to date automatically.
    </p>
    <div class="form_container">
      <v-form ref="formBrokerage" v-model="valid">
        <v-select
          v-model="select"
          :items="items"
          label="Select"
          return-object
        ></v-select>

        <v-text-field
          v-model="email"
          label="Email Address"
          color="primary"
          :rules="[rules.required, rulesEmail.format]"
          @keyup.enter="submit"
        ></v-text-field>

        <v-btn width="250" height="45" color="primary" class="my-3 text-button"
          >Next</v-btn
        >
        <p left class="text-body-2 text-right">
          <router-link to="">Skip for now</router-link>
        </p>
      </v-form>
    </div>
    <p id="brokerage_not_required">
      Don’t have a brokerage service? No problem! You can still use TradeShare,
      you’ll just need to manually add your activity
    </p>
  </div>
</template>

<script>
export default {
  name: "Brokerage",
  data: () => ({
    valid: true,
    email: "",
    select: "Questrade",
    items: ["Questrade", "Interactive Brokers"],
    rules: {
      required: (v) => !!v || "Required",
    },
    rulesEmail: {
      format: (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    },
  }),
  methods: {
    submit() {
      // add check to see if contents are undefined
      if (this.$refs.formBrokerage.validate()) {
        console.log("Brokerage: ", this.select, "\n", "Email: ", this.email);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.brokerage_page {
  margin: 34px 20% 34px 20%;
  margin-top: 60px;
}
.form_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  width: 400px;
}
p {
  font-size: 22;
  letter-spacing: 0.15px;
  font-family: Roboto;
  padding: 10px 0 10px 0;
}
#brokerage_not_required {
  color: rgba(0, 0, 0, 0.56);
}
</style>
