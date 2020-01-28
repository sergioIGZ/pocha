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
      players: []
    }
  },
  actions: {},
  getters: {},
  mutations: {
    addPlayer(state, playerName) {
      state.players.push(playerName)
    }
  },
  plugins: [vuexLocal.plugin]
})
export default store
