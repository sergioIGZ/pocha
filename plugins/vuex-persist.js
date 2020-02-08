import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      /* your options */
      reducer: state => ({
        players: state.players,
        currentGame: state.currentGame
      })
    }).plugin(store)
  })
}
