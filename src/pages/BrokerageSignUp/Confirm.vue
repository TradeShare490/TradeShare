<template>
  <Confirm :brokerage-app="Alpaca" />
</template>

<script>
/* istanbul ignore file */
import Confirm from '../../components/Brokerage/Confirm'
export default {
  name: 'ConfirmVue',
  components: { Confirm },
  data () {
    return {
      Alpaca: 'Alpaca'
    }
  }

}
</script>
