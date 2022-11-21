<template>
  <div>
    <players-list @on-delete-player="deletePlayer" :players="players" />
    <div class="p-2">
      <label for="playerName">Nombre</label>
      <input
        id="playerName"
        @keypress.enter="addPlayer"
        @focus="isTextFieldFocused = true"
        @blur="isTextFieldFocused = false"
        v-model="playerName"
        maxlength="15"
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
    <div v-show="!isTextFieldFocused" class="bottom py-4">
      <button @click="$router.push('/')">Salir</button>
    </div>
  </div>
</template>

<script>
import PlayersList from '../components/playersList/playersList'
export default {
  name: 'Players',
  components: { PlayersList },
  data() {
    return {
      playerName: '',
      isTextFieldFocused: false
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
      this.$store.commit('addPlayer', this.playerName.trim())
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
