import UserService from '../services/User.service'
export const useConnectAppMixin = {
  methods: {
    async connectApp () {
      window.open(process.env.VUE_APP_ALPACA_INTEGRATION_URL, '_self')
    },
    async removeApp (userId, store) {
      await UserService.removeAlpaca(userId, store)
      this.link = false
      this.$emit('linked', false)
    }
  }
}
