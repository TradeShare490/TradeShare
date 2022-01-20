<template>
  <v-container fluid fill-height class="my-0 py-0">
    <v-layout row align-center justify-content-center>
      <v-flex
        hidden-xs-only
        sm6
        md6
        lr6
        relative
        style="position: relative; padding: 0"
      >
        <v-img
          style="height: 100vh"
          src="../../assets/Login_SignUp_Picture.jpg"
          gradient="rgb(63, 81, 181, 0.8), rgb(63, 81, 181, 0.8)"
          alt="Business Picture"
        ></v-img>
        <div
          style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          "
        >
          <p class="white--text display-2 font-weight-bold">TradeShare</p>
          <p
            class="white--text text-h6 font-weight-bold my-0"
            v-for="item in items"
            :key="item.message"
          >
            {{ item.message }}
          </p>
        </div>
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
  data() {
    return {
      items: [
        { message: "Catchy description of platform." },
        { message: "Maybe more than." },
        { message: "One line." },
      ],
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "Login";
    },
  },
  components: {
    Login,
    SignUp,
  },
};
</script>
