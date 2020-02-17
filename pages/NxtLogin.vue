<template>
  <div class="login-form">
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
      password: 'Intelygenz01'
    }
  },
  methods: {
    doLogin() {
      axios
        .post(
          'http://app.nextinit.com/b/demoSergio/login',
          {
            email: this.email,
            pwd: this.password,
            forwardFrom: true
          },
          {
            headers: {
              crossdomain: true
              // ':authority': 'app.nextinit.com',
              // 'sec-fetch-mode': 'cors'
            }
          }
        )
        .then(response => {
          console.log('res', response)
          // this.htmlLogin()
        })
        .catch(err => {
          console.log('err', err)
          // this.htmlLogin()
        })
    },
    htmlLogin() {
      // its a valid user, need to post a form
      // document.location.href = "https://app.nextinit.com" + p_data.redirect;
      let form =
        '<form action="http://app.nextinit.com/b/demoSergio/login" method="POST">'
      form += '<input type="hidden" name="email" value="' + this.email + '">'
      form += '<input type="hidden" name="pwd" value="' + this.password + '">'
      form += '<input type="hidden" name="forwardFrom" value="true">'
      form += '</form>'
      document.querySelector('.login-form').innerHTML = form
      // form.submit()
      document.querySelector('form').submit()
      // $(form).appendTo('body').submit();
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
