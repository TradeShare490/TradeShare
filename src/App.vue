<template>
  <BrokerageSignUp />
  <Login />
</template>

<script>
import BrokerageSignUp from "./components/Brokerage/BrokerageSignUp.vue";
import Login from "./components/Login/Login.vue";

export default {
  name: "App",
  components: {
    BrokerageSignUp,
    Login,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
