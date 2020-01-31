<template>
  <div>
    <v-btn @click="$router.push('/game')">Nueva partida</v-btn>
    <v-btn @click="$router.push('/players')">Jugadores</v-btn>
    <v-btn @click="$router.push('/game')">Continuar partida</v-btn>
    <v-btn>Partidas anteriores</v-btn>
    <v-btn>About</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
