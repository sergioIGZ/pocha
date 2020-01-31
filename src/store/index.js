import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    players: [],
    currentGame: {
      players: [],
      round: 1
    }
  },
  actions: {},
  getters: {
    playersNotInGame(state) {
      return state.players.filter(playerName => !state.currentGame.players.map(player => player.name).includes(playerName))
    }
  },
  mutations: {
    addPlayer(state, playerName) {
      state.players.push(playerName)
    },
    deletePlayer(state, playerName) {
      state.players = state.players.filter(player => player !== playerName)
    },
    choosePlayer(state, playerName) {
      state.currentGame.players.push({ name: playerName, bet: 0, points: 0, totalPoints: 0 })
    },
    deleteGamePlayer(state, playerName) {
      state.currentGame.players = state.currentGame.players.filter(player => player.name !== playerName)
    },
    setPlayerBet(state, { name, bet }) {
      state.currentGame.players = state.currentGame.players.map(player => player.name === name ? {...player, bet} : player)
    },
    setPlayerPoints(state, { name, points }) {
      state.currentGame.players = state.currentGame.players.map(player => player.name === name ? {...player, points} : player)
    },
    nextRound(state) {
      state.currentGame.players = state.currentGame.players.map(player => {
        const {bet, points, totalPoints} = player
        let _totalPoints = 0
        if (bet !== points) {
          _totalPoints = (Math.abs(bet - points)) * -5
        } else {
          _totalPoints = points * 5 + 10
        }
        return {...player, points: 0, bet: 0, totalPoints: _totalPoints + totalPoints}
      })
      state.currentGame.round = state.currentGame.round + 1
    }
  },
  plugins: [vuexLocal.plugin]
})
export default store
