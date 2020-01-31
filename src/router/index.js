import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Players from '@/pages/Players'
import Game from '@/pages/Game'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/players', name: 'Players', component: Players },
    { path: '/game', name: 'Game', component: Game }
  ]
})
