<template>
  <div class="container mt-0 mx-auto">
    <div class="title mt-6 mb-11 px-7">
      CONNECTED APPS
    </div>
    <div>
      <div
        v-for="(app, i) in apps"
        :key="i"
      >
        <AppBlock
          :name="app.name"
          :image="app.image"
          :linked="app.linked"
          :disabled="app.disabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppBlock from '../../components/ConnectedApps/AppBlock.vue'

export default {
  name: 'ConnectedAppsPage',
  components: {
    AppBlock
  },
  data () {
    return {
      apps: [
        {
          name: 'Alpaca',
          image: require('../../assets/ConnectedAppLogos/alpaca.png'),
          linked: JSON.parse(localStorage.getItem('user')).alpacaToken !== 'None' && JSON.parse(localStorage.getItem('user')).alpacaToken !== undefined,
          disabled: false
        },
        {
          name: 'Moomoo',
          image: require('../../assets/ConnectedAppLogos/moomoo.png'),
          linked: false,
          disabled: true
        },
        {
          name: 'Welbull',
          image: require('../../assets/ConnectedAppLogos/webull.png'),
          linked: false,
          disabled: true
        },
        {
          name: 'SoFi Invest',
          image: require('../../assets/ConnectedAppLogos/sofiinvest.png'),
          linked: false,
          disabled: true
        },
        {
          name: 'Robinhood',
          image: require('../../assets/ConnectedAppLogos/robinhood.jpg'),
          linked: false,
          disabled: true
        },
        {
          name: 'Questrade',
          image: require('../../assets/ConnectedAppLogos/questrade.jpg'),
          linked: false,
          disabled: true
        }
      ]
    }
  }
}
</script>
<style scoped>
.container {
  width: 65%;
  background-color: white;
  height: 100%;
  flex-grow: 1;
}
@media only screen and (max-width: 768px) {
  .container {
  width: 100%;
}
}
.title {
  color: rgb(72, 95, 151);
  text-align: left;
}
</style>
