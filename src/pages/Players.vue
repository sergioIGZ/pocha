<template>
  <div>
    <players-list @on-delete-player="deletePlayer" :players="players"/>
    <div>
      <v-text-field outlined label="Nombre" placeholder="Ej: Jose" v-model="playerName"/>
      <v-btn outlined :disabled="!playerName" icon @click="addPlayer">Añadir jugador</v-btn>
    </div>
    <div class="bottom">
      <v-btn @click="$router.push('/')">Salir</v-btn>
    </div>
  </div>
</template>

<script>
import PlayersList from '../components/playersList'
export default {
  name: 'Players',
  components: {PlayersList},
  data() {
    return {
      playerName: ''
    }
  },
  computed: {
    players() {
      return this.$store.state.players
    }
  },
  methods: {
    addPlayer() {
      this.$store.commit('addPlayer', this.playerName)
      this.playerName = ''
    },
    deletePlayer(playerName) {
      this.$store.commit('deletePlayer', playerName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 36px;
    background-color: white;
    width: 100%;
  }
</style>
