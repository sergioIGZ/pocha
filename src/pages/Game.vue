<template>
  <div>
    <span v-if="!isGameStarted">Nueva partida</span>
    <span v-else>{{$store.state.currentGame.round}}</span>
    <v-btn v-if="!isGameStarted" @click="isGameStarted=true">Empezar</v-btn>
    <v-btn v-if="isGameStarted" @click="doNextRound">Siguiente Ronda ></v-btn>
    <div class="middle">
      <players-list v-if="!isGameStarted" class="marked" :players="gamePlayerNames" :show-delete="!isGameStarted" @on-delete-player="deleteGamePlayer"/>
      <points-player-list
        v-else class="marked"
        :players="gamePlayers"
        @set-player-bet="setPlayerBet"
        @set-player-points="setPlayerPoints" />
    </div>
    <players-list
      v-show="showSelectPlayers"
      :players="$store.getters.playersNotInGame"
      :show-delete="false"
      @on-player-click="choosePlayer" />
    <div class="bottom">
      <v-btn v-if="!isGameStarted" @click="showSelectPlayers = !showSelectPlayers">+ Jugador</v-btn>
      <v-btn @click="$router.push('/')">Salir</v-btn>
    </div>
  </div>
</template>

<script>
import PlayersList from '../components/playersList'
import PointsPlayerList from '../components/pointsPlayerList'
export default {
  name: 'Game',
  components: {PlayersList, PointsPlayerList},
  data() {
    return {
      isGameStarted: false,
      showSelectPlayers: false
    }
  },
  computed: {
    gamePlayerNames () {
      return this.$store.state.currentGame.players.map(player => player.name)
    },
    gamePlayers () {
      return this.$store.state.currentGame.players
    },
    totalPlayers () {
      return this.$store.state.players
    }
  },
  methods: {
    deleteGamePlayer(playerName) {
      this.$store.commit('deleteGamePlayer', playerName)
    },
    choosePlayer(playerName) {
      this.$store.commit('choosePlayer', playerName)
      this.showSelectPlayers = false
    },
    setPlayerBet({name, bet}) {
      this.$store.commit('setPlayerBet', { name, bet })
    },
    setPlayerPoints({name, points}) {
      this.$store.commit('setPlayerPoints', { name, points })
    },
    doNextRound() {
      console.log('next round')
      this.$store.commit('nextRound')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .marked {
    color: #42b983;
  }
  .bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 36px
  }
</style>
