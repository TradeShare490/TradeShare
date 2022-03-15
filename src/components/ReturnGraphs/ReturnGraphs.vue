<template>
  <v-card
    elevation="1"
    outlined
    min-width="350"
    data-cy="bar-char-container"
  >
    <v-card-title class="pb-0 pt-1">
      My Returns
      <v-spacer />
      <ComparisonModal :users="users" />
    </v-card-title>

    <div class="graphContainer">
      <g-chart
        v-if="loaded"
        :chartdata="dataCollection"
        :options="options"
      />
    </div>
  </v-card>
</template>

<script>
import GChart from './GChart.vue'
import ComparisonModal from '../../components/ComparisonTool/ComparisonModal.vue'

export default {
  name: 'BarChartContainer',
  components: {
    GChart,
    ComparisonModal
  },
  data: () => ({
    loaded: false,
    dataCollection: null,
    options: null,
    userList: ['Benver Vloshki', 'Mary Winchester', 'Mac Kafe', 'Tim Robenman', 'Ash Britain'],
    colors: ['red', 'green', 'yellow', 'purple', 'orange'],
    users: [{ name: 'My', color: 'primary' }]
  }),
  created () {
    for (let i = 0; i < this.userList.length; i++) {
      this.users.push({ name: this.userList[i] + "'s", color: this.colors[i] })
    }
  },
  mounted () {
    this.dataCollection = {
      labels: ['Apple', 'Google', 'TSLA'],
      datasets: [
        {
          label: 'Price at purchase',
          backgroundColor: 'blue',
          data: [0.1, 20, 10]
        },
        {
          label: 'Price now',
          backgroundColor: 'red',
          data: [6, 25, 30]
        }
      ]
    }
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    }
    this.loaded = true
  }
}
</script>
