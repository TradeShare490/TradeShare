<template>
  <div class="container mt-0 mx-auto">
    <div class="title mt-6 mb-11 px-7">
      CONNECTED APPS
    </div>
    <div>
      <div
        v-for="app in apps"
        :key="app.name"
      >
        <AppBlock
          :name="app.name"
          :image="app.image"
          :linked="app.linked"
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
        // <!-- '../../assets/ConnectedAppLogos/alpaca.png' -->
        {
          name: 'Alpaca',
          image: require('../../assets/ConnectedAppLogos/alpaca.png'),
          linked: true
        },
        {
          name: 'Moomoo',
          image: require('../../assets/ConnectedAppLogos/moomoo.png'),
          linked: false
        },
        {
          name: 'Welbull',
          image: require('../../assets/ConnectedAppLogos/webull.png'),
          linked: false
        },
        {
          name: 'SoFi Invest',
          image: require('../../assets/ConnectedAppLogos/sofiinvest.png'),
          linked: false
        },
        {
          name: 'Robinhood',
          image: require('../../assets/ConnectedAppLogos/robinhood.jpg'),
          linked: false
        },
        {
          name: 'Questrade',
          image: require('../../assets/ConnectedAppLogos/questrade.jpg'),
          linked: false
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
.title {
  color: rgb(72, 95, 151);
  text-align: left;
}
</style>
