<template>
  <BrokerageSignUp/>
</template>

<script>
import BrokerageSignUp from './components/Brokerage/BrokerageSignUp.vue'

export default {
  name: 'App',
  components: {
    BrokerageSignUp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
