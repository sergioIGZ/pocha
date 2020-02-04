<template>
  <ul v-show="players.length" class="players-list">
    <li
      v-for="(player, index) in players"
      :key="index"
      @click="onUserClick(player)"
    >
      <span>{{ player.name }}</span>
      <points-counter
        @change="setPlayerBet(player.name, $event)"
        :points="player.bet"
      />
      <points-counter
        @change="setPlayerPoints(player.name, $event)"
        :points="player.points"
      />
      <span :class="{ isRed: !player.hasWon }">{{ player.totalPoints }}</span>
    </li>
  </ul>
</template>

<script>
import PointsCounter from './pointsCounter/pointsCounter'
export default {
  name: 'PlayersList',
  components: { PointsCounter },
  props: {
    players: { type: Array, required: true },
    showDelete: { type: Boolean, required: false, default: true }
  },
  methods: {
    onUserClick(playerName) {
      this.$emit('on-player-click', playerName)
    },
    deletePlayer(playerName) {
      this.$emit('on-delete-player', playerName)
    },
    setPlayerBet(name, bet) {
      this.$emit('set-player-bet', { name, bet: bet < 0 ? 0 : bet })
    },
    setPlayerPoints(name, points) {
      this.$emit('set-player-points', { name, points: points < 0 ? 0 : points })
    }
  }
}
</script>

<style scoped>
.players-list {
  list-style: none;
  padding: 0;
  border: 1px solid #dddddd;
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
.isRed {
  color: #ee8888;
}
</style>
