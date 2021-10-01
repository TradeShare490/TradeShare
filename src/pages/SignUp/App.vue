<template>
  <SignUp><p>Already have an account? <a href="">Log in</a></p></SignUp>
</template>

<script>
import SignUp from "../../components/LoginSignUp/LoginSignUp.vue";

export default {
  name: "App",
  components: {
    SignUp,
  },
};
</script>
