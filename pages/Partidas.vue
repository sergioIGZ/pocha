<!--template>
  <div class="flex flex-col justify-center py-8 px-16">
    <div v-for="game in games">
      <div class="pt-4">{{ game.gameId }}</div>
      <div v-for="player in game.pointsChart" class="flex">
        <div>{{ player.name }}</div>
        <div class="pl-2">{{ player.totalPoints }}</div>
      </div>
    </div>
    <div class="fixed bottom-0 pb-6">
      <button @click="$router.push('/')" class="bg-red-500">Salir</button>
    </div>
  </div>
</template-->

<script>
/* import axios from 'axios'

export default {
  name: 'Partidas',
  data() {
    return {
      games: []
    }
  },
  mounted() {
    axios
      .get('/api/game')
      .then(r => {
        console.log('r get', r)
        this.games = r.data
      })
      .catch(err => console.log('error get', err))
  }
} */
</script>
