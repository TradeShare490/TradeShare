<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="1300"
      persistent
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          data-cy="modal-activate"
          medium
          v-on="on"
        >
          COMPARE
        </v-btn>
      </template>
      <v-card
        style="overflow: hidden"
        class="px-8 pb-8 pr-6"
        data-cy="modal"
      >
        <v-card-title class="pl-0 pr-0">
          Comparing Equities - Last 4 Weeks
          <v-spacer />
          <button @click="dialog = false">
            <v-icon right>
              mdi-close
            </v-icon>
          </button>
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            xl="9"
            lg="9"
            md="9"
            sm="12"
            class="d-flex justify-center align-center"
          >
            <v-card
              height="500"
              width="100%"
              flat
            >
              <LineChart
                :chart-data="line.data"
                :options="options"
                :height="200"
              />
            </v-card>
          </v-col>
          <v-col
            cols="12"
            xl="3"
            lg="3"
            md="3"
            sm="12"
          >
            <v-card flat>
              <v-row>
                <v-col
                  cols="5"
                  xl="12"
                  lg="12"
                  md="12"
                  sm="5"
                  class="pr-0"
                >
                  <v-card-title class="subtitle-1 pb-0 pl-0 pt-0">
                    LEGEND
                  </v-card-title>
                  <v-card-text
                    v-for="(user, i) in usersLegend"
                    :key="i"
                    class="pt-0 pb-0 pl-0 pr-0 text-left"
                    data-cy="legend"
                  >
                    <v-icon
                      left
                      :color="user.color"
                    >
                      mdi-circle-medium
                    </v-icon>
                    {{ user.name }}
                  </v-card-text>
                </v-col>
                <v-col
                  cols="7"
                  xl="12"
                  lg="12"
                  md="12"
                  sm="7"
                >
                  <div style="display: None;">
                    <v-radio-group
                      v-model="radios"
                      mandatory
                      dense
                    >
                      <div class="d-flex flex-wrap flex-xl-column flex-lg-column flex-md-column flex-sm-row flex-row">
                        <v-radio
                          v-for="(option, i) in options"
                          :key="i"
                          :label="option.label"
                          :value="option.value"
                          data-cy="radio-buttons"
                          class="pr-6 mb-1"
                        />
                      </div>
                      <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        :nudge-left="260"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="from"
                            v-bind="attrs"
                            label="From"
                            dense
                            readonly
                            :disabled="radios != 'custom'"
                            class="pl-xl-8 pl-lg-8 pl-md-8 pl-sm-1 pl-1 pr-xl-10 pr-lg-10 pr-md-10 pr-sm-2 pr-2 pt-1"
                            data-cy="from"
                            clearable
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="from"
                          no-title
                          :max="getTodaysDate"
                          data-cy="date-picker-from"
                          @change="menu1 = false"
                        />
                      </v-menu>
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        :nudge-left="260"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                            v-model="to"
                            dense
                            readonly
                            label="To"
                            v-bind="attrs"
                            :disabled="radios != 'custom'"
                            class="pl-xl-8 pl-lg-8 pl-md-8 pl-sm-1 pl-1 pr-xl-10 pr-lg-10 pr-md-10 pr-sm-2 pr-2 pt-1"
                            data-cy="to"
                            clearable
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="to"
                          no-title
                          :max="getTodaysDate"
                          :min="from"
                          data-cy="date-picker-to"
                          @change="menu2 = false"
                        />
                      </v-menu>
                      <v-row class="justify-end pt-5 pr-xl-12 pr-lg-12 pr-md-12 pr-sm-5 pr-5">
                        <v-btn
                          color="primary"
                          small
                          width="90"
                          data-cy="update"
                          @click="handleInput"
                        >
                          UPDATE
                        </v-btn>
                      </v-row>
                    </v-radio-group>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LineChart from '../ReturnGraphs/LineChart'
export default {
  name: 'ComparisonTool',
  components: { LineChart },
  props: {
    users: {
      type: Array,
      default () {
        return [{ name: '', color: '' }]
      }
    },
    data: {
      type: Array,
      default: null
    },
    labels: {
      type: Array,
      default: null
    },
    myEquities: {
      type: Array,
      default: null
    },
    compareMe: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    radios: '',
    dialog: false,
    comparison: '',
    from: '',
    to: '',
    menu1: false,
    menu2: false,
    options2: [
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Year', value: 'year' },
      { label: 'YTD', value: 'ytd' },
      { label: 'Maximum', value: 'max' },
      { label: 'Custom', value: 'custom' }
    ],
    getTodaysDate: new Date().toISOString().slice(0, 10)
  }),
  computed: {
    usersLegend () {
      if (this.compareMe) {
        return [
          {
            name: 'Me', color: 'blue'
          },
          {
            name: this.username, color: 'green'
          }
        ]
      } else {
        return this.users
      }
    },
    line () {
      if (this.compareMe) {
        return {
          data: {
            labels: this.labels,
            datasets: [
              {
                label: this.username,
                data: this.data,
                borderColor: 'green'
              },
              {
                label: 'Me',
                data: this.myEquities,
                borderColor: 'blue'
              }
            ]
          }
        }
      } else {
        return {
          data: {
            labels: this.labels,
            datasets: [
              {
                label: 'Me',
                data: this.data,
                borderColor: 'blue'
              },
              {
                label: 'Mac Kafe',
                data: [70119, 70832, 71646, 72099, 74205, 77285, 77682, 77786, 77999, 78022, 79689, 79831, 80384, 81975, 83866, 84615, 89550, 90918, 92196, 95802, 99737],
                borderColor: 'yellow'
              },
              {
                label: 'Mary Winchester',
                data: [72041, 73838, 75366, 75759, 75953, 79246, 82020, 85963, 87352, 87597, 88105, 89601, 90304, 90457, 90968, 91763, 94134, 94840, 98224, 99176, 99214],
                borderColor: 'green'
              },
              {
                label: 'Jennie Kim',
                data: [71540, 71622, 73042, 73921, 74165, 74536, 76711, 78318, 78773, 80505, 82726, 83753, 87553, 88272, 89591, 92004, 93340, 94528, 95094, 96309, 96405],
                borderColor: 'orange'
              },
              {
                label: 'Kevin Nguyen',
                data: [71426, 71693, 72127, 73221, 74641, 75398, 77726, 78505, 79876, 81724, 82772, 85165, 86488, 87835, 90585, 91081, 91126, 91697, 91834, 94022, 96139],
                borderColor: 'purple'
              },
              {
                label: 'Gojo Satoru',
                data: [73599, 78894, 80671, 81734, 82051, 82334, 83204, 84668, 87868, 92462, 93266, 93554, 93875, 95572, 96763, 97732, 97978, 98367, 98968, 99284, 99497],
                borderColor: 'black'
              }
            ]
          }
        }
      }
    }
  },
  methods: {

    handleInput () {
      const today = this.getTodaysDate
      let start = ''
      let end = ''
      if (this.radios === 'custom') {
        if (this.from === '' & this.to === '' || this.from === null & this.to === null) {
          this.from = today
          this.to = today
        } else if (this.to === '' || this.to === null) {
          this.to = today
        } else if (this.from === '' || this.from === null) {
          this.from = '1900-01-01'
        }
      } else if (this.radios === 'day') {
        start = today
        end = today
      } else if (this.radios === 'week') {
        const date = new Date()
        date.setDate(date.getDate() - 7)
        start = date.toISOString().slice(0, 10)
        end = today
      } else if (this.radios === 'month') {
        const date = new Date()
        date.setDate(date.getDate() - 30)
        start = date.toISOString().slice(0, 10)
        end = today
      } else if (this.radios === 'year') {
        const date = new Date()
        date.setDate(date.getDate() - 365)
        start = date.toISOString().slice(0, 10)
        end = today
      } else if (this.radios === 'ytd') {
        const date = new Date()
        start = date.getFullYear() + '-01-01'
        end = today
      }
      if (start !== '' & end !== '') {
        console.log(start)
        console.log(end)
      } else {
        console.log(this.from)
        console.log(this.to)
      }
    }
  }
}
</script>
