<template>
  <ul v-show="players.length" class="players-list">
    <li
      v-for="(player, index) in players"
      :key="index"
      @click="onUserClick(player)"
    >
      <div class="left text-gray-700">
        <span>{{ player.name }}</span>
      </div>
      <div class="middle">
        <points-counter
          @change="setPlayerBet(player.name, $event)"
          :points="player.bet"
        />
        <points-counter
          @change="setPlayerPoints(player.name, $event)"
          :points="player.points"
        />
      </div>
      <div class="right">
        <span :class="{ isRed: !player.hasWon }">{{ player.totalPoints }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import PointsCounter from '../pointsCounter/pointsCounter'
export default {
  name: 'PlayersList',
  components: { PointsCounter },
  props: {
    players: { type: Array, required: true },
    maxPoints: { type: Number, required: true },
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
      let _bet = bet
      if (bet < 0) _bet = 0
      if (bet > this.maxPoints) _bet = this.maxPoints
      this.$emit('set-player-bet', { name, bet: _bet })
    },
    setPlayerPoints(name, points) {
      let _points = points
      if (points < 0) _points = 0
      if (points > this.maxPoints) _points = this.maxPoints
      this.$emit('set-player-points', { name, points: _points })
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
.left {
  width: 29%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.middle {
  width: 61%;
  display: flex;
  align-items: center;
}
.right {
  width: 10%;
  text-align: right;
}
</style>
