import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.indigo,
        untagged: '#5E4D79',
        friend: '#00A99F',
        work: '#C4C825',
        purchased: '#008D49',
        sold: '#BF0E08'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
