export const useConnectAppMixin = {
  methods: {
    async connectApp () {
      this.link = true
      this.$emit('linked', true)
    },
    async removeApp () {
      this.link = false
      this.$emit('linked', false)
    }
  }
}
