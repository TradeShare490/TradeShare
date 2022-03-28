<template>
  <v-card
    elevation="1"
    outlined
    min-width="350"
    data-cy="bar-char-container"
  >
    <v-card-title class="pb-1 pt-3">
      My Equities
      <v-spacer />
      <ComparisonModal
        :users="users"
        :data="monthEquities"
        :labels="monthTimestamps"
        :compare-me="compareMe"
        :username="userName"
        :my-equities="myMonthEquities"
        :options="options"
      />
    </v-card-title>

    <div class="chart">
      <v-tabs
        fixed-tabs
      >
        <v-tab
          @click="getHistory('intraday')"
        >
          Today
        </v-tab>
        <v-tab
          @click="getHistory('1M')"
        >
          Month
        </v-tab>
        <v-tab
          @click="getHistory('1A')"
        >
          Year
        </v-tab>
        <v-tab
          @click="getHistory('all')"
        >
          Total
        </v-tab>
      </v-tabs>

      <LineChart
        :chart-data="line.data"
        :options="options"
        :width="300"
        :height="100"
      />
    </div>
  </v-card>
</template>

<script>
import LineChart from './LineChart'
import ComparisonModal from '../../components/ComparisonTool/ComparisonModal.vue'
import UserService from '../../services/User.service'
export default {
  name: 'LineChartContainer',
  components: {
    LineChart,
    ComparisonModal
  },
  props: {
    userId: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    },
    compareMe: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loaded: false,
    dataCollection: null,
    userList: ['Mary Winchester', 'Mac Kafe'],
    colors: ['green', 'yellow'],
    users: [{ name: 'Me', color: 'primary' }],
    labels: [],
    equities: [],
    ticks: 16,
    monthEquities: [],
    monthTimestamps: [],
    myMonthEquities: []
  }),
  computed: {
    line () {
      return {
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.userName,
              data: this.equities,
              borderColor: 'blue'
            }
          ]
        }
      }
    },
    options () {
      return {
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                maxTicksLimit: 10,
                maxRotation: 0,
                minRotation: 0
              }
            }
          ]
        },
        elements: {
          line: {
            fill: false,
            tension: 0,
            borderWidth: 4
          },
          point: {
            radius: 0,
            hitRadius: 5,
            hoverRadius: 5
          }
        },
        legend: {
          display: false
        },
        responsive: true

      }
    }
  },

  beforeMount () {
    this.getHistory('intraday')
    this.getMonthHistory()
    this.getMyMonthHistory()
    for (let i = 0; i < this.userList.length; i++) {
      this.users.push({ name: this.userList[i], color: this.colors[i] })
    }
  },
  methods: {
    convertDate (date) {
      return date.map(time => {
        return new Date(time * 1000).toLocaleDateString(navigator.language, {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })
      })
    },
    async getMonthHistory () {
      const monthData = await UserService.getEquities(this.userId, '1M')
      this.monthEquities = monthData.equity
      this.monthTimestamps = this.convertDate(monthData.timestamp)
    },
    async getMyMonthHistory () {
      const monthData = await UserService.getEquities(JSON.parse(localStorage.getItem('user')).userId, '1M')
      this.myMonthEquities = monthData.equity
    },
    async getHistory (period) {
      this.dataCollection = await UserService.getEquities(this.userId, period)
      this.equities = this.dataCollection.equity
      switch (period) {
        case 'intraday':
          this.labels = this.dataCollection.timestamp.map(time => {
            return new Date(time * 1000).toLocaleTimeString(navigator.language, {
              hour: '2-digit',
              minute: '2-digit'
            })
          })
          break
        case '1M':
          this.labels = this.convertDate(this.dataCollection.timestamp)
          break
        case '1A':
          this.labels = this.convertDate(this.dataCollection.timestamp)
          break
        case 'all':
          this.labels = this.convertDate(this.dataCollection.timestamp)
          break
      }
    }
  }

}
</script>
