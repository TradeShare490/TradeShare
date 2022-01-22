<template>
  <v-card elevation="1" outlined min-width="350" data-cy="bar-char-container">
    <div class="graphContainer">
      <g-chart
        v-if="loaded"
        :chartdata="this.dataCollection"
        :options="this.options"
      />
    </div>
  </v-card>
</template>

<script>
import GChart from "./GChart.vue";
export default {
  components: { GChart },
  name: "BarChartContainer",
  /* data: () => ({
        loaded=false,
        chartdata:null
    }),
    async mounted () {
        this.loaded = false;
        try{
            const {StockData} = await fetch("/OURAPI")
            this.chartdata = StockData
            this.loaded = true
        } catch(e){
            console.error(e)
        }
    }*/
  data: () => ({
    loaded: false,
    dataCollection: null,
    options: null,
  }),
  mounted() {
    this.dataCollection = {
      labels: ["Apple", "Google", "TSLA"],
      datasets: [
        {
          label: "Price at purchase",
          backgroundColor: "blue",
          data: [0.1, 20, 10],
        },
        {
          label: "Price now",
          backgroundColor: "red",
          data: [6, 25, 30],
        },
      ],
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
    };
    console.log("Now mounted");
    this.loaded = true;
  },
};
</script>
