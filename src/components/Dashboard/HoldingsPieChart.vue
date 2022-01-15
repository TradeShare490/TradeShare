<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    equities: Number,
    cash: Number,
    options: Number,
  },
  data: () => ({
    chartOptions: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false,
      },
    },
  }),
  computed: {
    chartdata: function() {
      return {
        datasets: [
          {
            label: "Holdings",
            backgroundColor: ["#2274E6", "#1E984F", "#000000"],
            data: [this.equities, this.cash, this.options],
          },
        ],
        labels: ["Equities", "Cash", "Options"],
      };
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.chartOptions);
  },
};
</script>
