<template>
  <div>
    <input v-model="email" type="text" />
    <input v-model="password" type="password" />
    <button @click="doLogin">login</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  Name: 'NxtLogin',
  data() {
    return {
      email: 'sergio.touset@intelygenz.com',
      password: 'Intelygenz.com'
    }
  },
  methods: {
    doLogin() {
      axios
        .post('https://app.nextinit.com/b/demoSergio/login', {
          email: this.email,
          pwd: this.password
        })
        .then(response => {
          console.log('res', response)
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
}
</script>

<!--<style scoped>-->
<!--  -->
<!--</style>-->
