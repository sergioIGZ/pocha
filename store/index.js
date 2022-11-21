import { format } from 'date-fns'
import axios from 'axios'

export const state = () => ({
  players: [],
  currentGame: {
    players: [],
    round: 1
  },
  previousRound: {},
  alert: {
    isVisible: false,
    type: null,
    message: '',
    title: '',
    yesNoButtons: false,
    yesAction: null,
    noAction: null
  }
})
export const getters = {
  playersNotInGame(state) {
    return state.players.filter(
      playerName =>
        !state.currentGame.players
          .map(player => player.name)
          .includes(playerName)
    )
  }
}
export const actions = {
  saveGame: async ({ state, commit }) => {
    const players = state.currentGame.players
    const playerNames = players
      .map(player => player.name.trim())
      .join()
      .replace(/,/g, '-')
    const gameId = format(new Date(), 'yyyyMMddHH') + playerNames

    const pass = prompt('contraseña')
    if (pass === 'kami') {
      const response = await axios.post('/api/game', {
        gameId,
        pointsChart: players
      })
      if (response.data.success === false && response.data.message) {
        commit('showAlert', {
          isVisible: true,
          type: 'error',
          title: 'Y lo sabes... ',
          message:
            'Te lo he dicho tronco, ke ya has guardao esta partida!!  ¬_¬'
        })
      } else {
        commit('showAlert', {
          isVisible: true,
          type: 'success',
          title: 'Todo bien, todo correcto',
          message: 'Partida guardada correctamente, no le des mas al botoncito'
        })
      }
      axios
        .get('/api/game')
        .then(r => console.log('r get', r))
        .catch(err => console.log('error get', err))
    } else {
      setTimeout(() => {
        commit('showAlert', {
          isVisible: true,
          type: 'error',
          title: 'NOP',
          message:
            'Contraseña incorrecta. Pista: nombre del creador de esta cutre-web (en minúsculas)'
        })
      }, 10)
    }
  }
}

export const mutations = {
  showAlert(state, config) {
    state.alert = config
  },
  closeAlert(state) {
    state.alert = { isVisible: false, title: '', message: '', type: null }
  },
  addPlayer(state, playerName) {
    state.players.push(playerName)
  },
  deletePlayer(state, playerName) {
    state.players = state.players.filter(player => player !== playerName)
  },
  newGame(state) {
    state.currentGame.players = []
    state.currentGame.round = 0
  },
  startGame(state) {
    state.currentGame.round = 1
  },
  choosePlayer(state, playerName) {
    state.currentGame.players.push({
      name: playerName,
      bet: 0,
      points: 0,
      totalPoints: 0,
      hasWonLastRound: null
    })
  },
  deleteGamePlayer(state, playerName) {
    state.currentGame.players = state.currentGame.players.filter(
      player => player.name !== playerName
    )
  },
  setPlayerBet(state, { name, bet }) {
    state.currentGame.players = state.currentGame.players.map(player =>
      player.name === name ? { ...player, bet } : player
    )
  },
  setPlayerPoints(state, { name, points }) {
    state.currentGame.players = state.currentGame.players.map(player =>
      player.name === name ? { ...player, points } : player
    )
  },
  setPlayerTotalPoints(state, playerPoints) {
    state.currentGame.players = state.currentGame.players.map(
      (player, index) => ({
        ...player,
        totalPoints: Number(playerPoints[index])
      })
    )
  },
  nextRound(state) {
    state.previousRound = JSON.parse(
      JSON.stringify(Object.freeze(state.currentGame))
    )
    state.currentGame.players = state.currentGame.players.map(player => {
      const { bet, points, totalPoints } = player
      let _totalPoints
      if (bet !== points) {
        _totalPoints = Math.abs(bet - points) * -5
      } else {
        _totalPoints = points * 5 + 10
      }
      const hasWon = _totalPoints > 0
      return {
        ...player,
        points: 0,
        bet: 0,
        totalPoints: _totalPoints + totalPoints,
        hasWon,
        roundsWon: (player.roundsWon || 0) + (hasWon ? 1 : 0),
        roundsLost: (player.roundsLost || 0) + (!hasWon ? 1 : 0)
      }
    })
    state.currentGame.round = state.currentGame.round + 1
  },
  resetRound(state) {
    state.currentGame = JSON.parse(JSON.stringify(state.previousRound))
  }
}
