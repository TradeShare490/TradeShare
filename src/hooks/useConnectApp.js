import UserService from '../services/User.service'
export const useConnectAppMixin = {
  methods: {
    async connectApp () {
      if (name === 'Alpaca') {
        window.open(process.env.VUE_APP_ALPACA_INTEGRATION_URL, '_self')
      }
    },
    async removeApp (userId, store, name) {
      if (name === 'Alpaca') {
        await UserService.removeAlpaca(userId, store)
        this.link = false
        this.$emit('linked', false)
      }
    }
  }
}
