<template>
  <div>
    <ul v-show="players.length" class="players-list">
      <li v-for="(player, index) in players" :key="index">
        <span>{{player}}</span>
        <v-btn class="mx-2" @click="deletePlayer(player)" fab dark small color="secondary">
          <span class="icon-bin2"/>
        </v-btn>
      </li>
    </ul>
    <div>
      <v-text-field outlined label="Nombre" placeholder="Ej: Jose" v-model="playerName"/>
      <v-btn :disabled="!playerName" icon @click="addPlayer">Añadir jugador</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Players',
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
.players-list {
  list-style: none;
  padding: 0;
  border: 1px solid #dddddd
}
.players-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #dddddd;
}
  .players-list :last-child {
    border-bottom: none;
  }
</style>
