<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="1300"
      persistent
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="red"
          dark
          v-bind="attrs"
          data-cy="modal-activate"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card
        style="overflow: hidden"
        class="px-8 pb-8 pr-0"
        data-cy="modal"
      >
        <v-card-title class="pl-0">
          Comparing Returns
          <v-spacer />
          <button @click="dialog = false">
            <v-icon right>
              mdi-close
            </v-icon>
          </button>
        </v-card-title>
        <v-row>
          <v-col
            cols="9"
            class="d-flex justify-center align-center"
          >
            <v-card
              height="500"
              width="100%"
              class="d-flex justify-center align-center"
            >
              Insert graph here, and add "flat" to this v-card
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card
              flat
            >
              <v-card-title class="subtitle-1 pb-0 pl-0 pt-0">
                LEGEND
              </v-card-title>
              <v-row>
                <v-col>
                  <v-card-text
                    v-for="(user, i) in users"
                    :key="i"
                    class="pt-0 pb-0 pl-0 text-left"
                    data-cy="legend"
                  >
                    <v-icon
                      left
                      :color="user.color"
                    >
                      mdi-circle-medium
                    </v-icon>
                    {{ user.name }} returns
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
            <v-radio-group
              v-model="radios"
              mandatory
              dense
            >
              <v-radio
                v-for="(option, i) in options"
                :key="i"
                :label="option.label"
                :value="option.value"
                data-cy="radio-buttons"
              />
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="from"
                    v-bind="attrs"
                    label="From"
                    dense
                    :disabled="radios != 'custom'"
                    class="pl-8 pr-9 pt-1"
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
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="to"
                    dense
                    label="To"
                    v-bind="attrs"
                    :disabled="radios != 'custom'"
                    class="pl-8 pr-9"
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
              <v-row class="justify-end pt-5 pr-12">
                <v-btn
                  color="primary"
                  small
                  width="90"
                  data-cy="refresh"
                  @click="handleInput"
                >
                  REFRESH
                </v-btn>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default () {
        return [{ name: '', color: '' }]
      }
    }
  },
  data: () => ({
    radios: '',
    comparison: '',
    from: '',
    to: '',
    dialog: false,
    menu1: false,
    menu2: false,
    options: [
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
  methods: {
    handleInput () {
      console.log(this.radios)
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
