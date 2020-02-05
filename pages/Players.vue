<template>
  <div>
    <players-list @on-delete-player="deletePlayer" :players="players" />
    <div class="px-2">
      <label for="playerName">Nombre</label>
      <input
        id="playerName"
        @keypress.enter="addPlayer"
        v-model="playerName"
        placeholder="Ej: Jose"
      />
      <button
        @click="addPlayer"
        :class="{ 'opacity-50': !playerName }"
        :disabled="!playerName"
      >
        Añadir jugador
      </button>
    </div>
    <div class="bottom py-4">
      <button @click="$router.push('/')">Salir</button>
    </div>
  </div>
</template>

<script>
import PlayersList from '../components/playersList'
export default {
  name: 'Players',
  components: { PlayersList },
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
      if (this.players.includes(this.playerName)) {
        return alert(`Ke ${this.playerName} ya existe MELOOOON!`)
      }
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
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
