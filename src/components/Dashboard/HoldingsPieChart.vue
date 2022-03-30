<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    equities: {
      type: Number,
      default: 0
    },
    cash: {
      type: Number,
      default: 0
    },
    options: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    chartOptions: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false
      }
    }
  }),
  computed: {
    chartdata: function () {
      return {
        datasets: [
          {
            label: 'Holdings',
            backgroundColor: ['#4054b4', '#128c1c', '#EF6C00'],
            data: [this.equities, this.cash, this.options]
          }
        ],
        labels: ['Equities', 'Cash', 'Options']
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.chartOptions)
  }
}
</script>
