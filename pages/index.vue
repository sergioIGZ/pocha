<template>
  <div>
    <button @click="setNewGame">Nueva partida</button>
    <button @click="$router.push('/players')">Jugadores</button>
    <button @click="$router.push('/game')">Continuar partida</button>
    <!--    <button>Partidas anteriores</button>-->
    <!--    <button>About</button>-->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    setNewGame() {
      const result = window.prompt(
        '¿Estás seguro de que quieres empezar una nueva partida?\n Se perderán los datos de la última'
      )
      if (result !== null) {
        this.$store.commit('newGame')
        this.$router.push('/game')
      }
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
