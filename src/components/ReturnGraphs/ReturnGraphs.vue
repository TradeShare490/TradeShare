<template>
  <v-card
    elevation="1"
    outlined
    min-width="350"
    data-cy="bar-char-container"
    class="ml-4"
  >
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
export default {
  name: 'BarChartContainer',
  components: { GChart },
  data: () => ({
    loaded: false,
    dataCollection: null,
    options: null
  }),
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
