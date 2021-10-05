<template>
  <div class="page_left">
    <div class="text">
      <p class="company_name">TradeShare</p>
      <p class="catch_phrase">Catchy description of platform.</p>
      <p class="catch_phrase">Maybe more than.</p>
      <p class="catch_phrase">One line.</p>
    </div>
    <div class="color_overlay"></div>
    <img
      class="image"
      src="../../assets/Login_SignUp_Picture.jpg"
      alt="Business Picture"
    />
  </div>
  <div class="page_right">
    <img class="logo" src="../../assets/TradeShare.png" alt="TradeShare Logo" />
    <div>
      <Login v-if="isLogin" />
      <SignUp v-else />
    </div>
  </div>
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
.page_left {
  width: 50%;
  height: 100%;
  display: flex;
  position: absolute;
  overflow: hidden;
}

.text {
  position: absolute;
  padding: 60px;
  z-index: 20;
  color: white;
}

.company_name {
  position: relative;
  left: -20px;
  font-size: 5vh;
  font-weight: bold;
}

.catch_phrase {
  position: relative;
  left: 60px;
  font-size: 2.5vh;
  font-weight: bold;
  margin: 10px;
}

.color_overlay {
  width: 100%;
  height: 100vh;
  display: flex;
  position: absolute;
  overflow: hidden;
  background-color: rgba(63, 81, 181, 0.65);
  position: absolute;
  z-index: 10;
}

.image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: 20% 0;
  filter: contrast(175%) grayscale(100%) brightness(80%);
}

.page_right {
  display: flex;
  flex-direction: column;
  align-items: center;
  float: right;
  width: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.logo {
  width: auto;
  height: 15vh;
}
</style>

