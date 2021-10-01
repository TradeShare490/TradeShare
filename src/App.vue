<template>
  <!-- <Brokerage /> --> <!--uncomment to see brokerage page --> 
  <!-- <Login /> --> <!--uncomment to see login page --> 
  <SignUp />
</template>

<script>
//import Brokerage from "./pages/BrokerageSignUp/App.vue" //uncomment to see brokerage page
//import Login from "./pages/Login/App.vue" //uncomment to see login page
import SignUp from "./pages/SignUp/App.vue"

export default {
  name: "App",
  components: {
    //Brokerage, //uncomment to see brokerage page
    //Login //uncomment to see login page
    SignUp
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
