<template>
  <div class="pt-5">
    <ComparisonModal :users="users" />
  </div>
</template>

<script>
import ComparisonModal from '../../components/ComparisonTool/ComparisonModal.vue'

export default {
  name: 'ComparisonTool',
  components: {
    ComparisonModal
  },
  data () {
    return {
      userList: ['Benver Vloshki', 'Mary Winchester', 'Mac Kafe', 'Tim Robenman', 'Ash Britain'],
      colors: ['red', 'green', 'yellow', 'purple', 'orange'],
      users: [
        { name: 'My', color: 'primary' }
      ]
    }
  },
  created () {
    for (let i = 0; i < this.userList.length; i++) {
      this.users.push({ name: this.userList[i] + "'s", color: this.colors[i] })
    }
  }
}
</script>
