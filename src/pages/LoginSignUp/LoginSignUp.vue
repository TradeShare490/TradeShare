<template>
  <v-container fluid fill-height class="my-0 py-0">
    <v-layout row align-center justify-content-center>
      <v-flex hidden-xs-only sm6 md6 lr6>
        <div class="text">
          <p class="text-p display-2 font-weight-bold">TradeShare</p>
          <p class="catch_phrase">Catchy description of platform.</p>
          <p class="catch_phrase">Maybe more than.</p>
          <p class="catch_phrase">One line.</p>
        </div>
        <v-img
          class="img"
          src="../../assets/Login_SignUp_Picture.jpg"
          gradient="rgb(63, 81, 181, 0.8), rgb(63, 81, 181, 0.8)"
          alt="Business Picture"
        ></v-img>
      </v-flex>
      <v-flex class="mt-4">
        <v-img
          class="mx-auto"
          max-width="15vh"
          contain
          src="../../assets/TradeShare.png"
          alt="TradeShare Logo"
        >
        </v-img>
        <Login v-if="isLogin" />
        <SignUp v-else />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Login from "../../components/Login/Login.vue";
  import SignUp from "../../components/SignUp/SignUp.vue";

  export default {
    name: "App",
    components: {
      Login,
      SignUp,
    },
    computed: {
      isLogin() {
        return this.$route.name === "Login";
      },
    },
  };
</script>

<style>
  .text {
    position: absolute;
    padding-top: 60px;
    padding-left: 1%;
    z-index: 20;
    color: white;
  }

  .catch_phrase {
    position: relative;
    left: 2vh;
    font-size: 2.5vh;
    font-weight: bold;
  }

  .img {
    height: 100vh;
  }
</style>
