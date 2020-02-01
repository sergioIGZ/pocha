<template>
  <div>
    <span v-if="!isGameStarted">Nueva partida</span>
    <div v-else>
      <span>Ronda: {{$store.state.currentGame.round}}</span>
      <span>Cartas: {{this.cards}}</span>
    </div>
    <v-btn v-if="!isGameStarted" @click="startGame">Empezar</v-btn>
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
      cards: 1,
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
    },
    round () {
      return this.$store.state.currentGame.round
    }
  },
  methods: {
    startGame() {
      if (this.gamePlayers.length < 3) {
        alert('No hay jugadores suficientes!')
      } else {
        this.$store.commit('startGame')
        this.isGameStarted = true
      }
    },
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
      const numberOfPlayers = this.gamePlayers.length
      const coefficient = Math.trunc(40 / numberOfPlayers)
      const round = this.round + 1
      let cards = 0

      if (round <= numberOfPlayers ||
        round > 2 * numberOfPlayers + 2 * (coefficient - 2)
      ) {
        cards = 1
      } else if (round > numberOfPlayers &&
        round < numberOfPlayers + coefficient - 1) {
        cards = round - numberOfPlayers + 1
      } else if (round >= numberOfPlayers + coefficient - 1 &&
      round <= 2 * numberOfPlayers + coefficient - 2) {
        cards = coefficient
      } else if (round >= numberOfPlayers + coefficient - 1 &&
        round < 2 * numberOfPlayers + 2 * (coefficient - 2) + 1) {
        cards = 2 * numberOfPlayers + coefficient - 2 + coefficient - round
      } else {
        cards = 9999999
      }

      this.cards = cards
      const playerBets = this.gamePlayers.reduce((acc, next) => (acc + next.bet), 0)
      const playerPoints = this.gamePlayers.reduce((acc, next) => (acc + next.points), 0)
      if (playerBets === playerPoints) return alert('las apuestas son igual a las rondas')
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
