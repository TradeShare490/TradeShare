<template>
  <Login><p>Don't have an account? <a href="">Sign up</a></p></Login>
</template>

<script>
import Login from "../../components/LoginSignUp/LoginSignUp.vue";

export default {
  name: "App",
  components: {
    Login,
  },
};
</script>
