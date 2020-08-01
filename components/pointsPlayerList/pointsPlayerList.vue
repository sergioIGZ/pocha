<template>
  <div>
    <div class="flex relative w-full h-6">
      <div
        :style="{ left: `${totalBetsPosition}px` }"
        :class="{ 'text-red-500': totalBets === maxPoints }"
        class="absolute"
      >
        {{ totalBets }}
      </div>
      <div
        :style="{ left: `${totalPointsPosition}px` }"
        :class="{ 'text-red-500': totalPoints !== maxPoints }"
        class="absolute rounded-full"
      >
        {{ totalPoints }}
      </div>
    </div>
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
            :ref="`leftCounter${index}`"
            @change="setPlayerBet(player.name, $event)"
            :points="player.bet"
          />
          <points-counter
            :ref="`rightCounter${index}`"
            @change="setPlayerPoints(player.name, $event)"
            :points="player.points"
          />
        </div>
        <div class="right">
          <span :class="{ isRed: !player.hasWon }">{{
            player.totalPoints
          }}</span>
        </div>
      </li>
    </ul>
  </div>
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
  data() {
    return { totalBetsPosition: 0, totalPointsPosition: 0 }
  },
  computed: {
    totalBets() {
      return this.players.reduce((acc, player) => {
        return acc + player.bet
      }, 0)
    },
    totalPoints() {
      return this.players.reduce((acc, player) => {
        return acc + player.points
      }, 0)
    }
  },
  mounted() {
    if (this.$refs.leftCounter0) {
      const {
        x,
        width
      } = this.$refs.leftCounter0[0].$el.getBoundingClientRect()
      this.totalBetsPosition = x + width / 2 - 4
    }
    if (this.$refs.rightCounter0) {
      const {
        x,
        width
      } = this.$refs.rightCounter0[0].$el.getBoundingClientRect()
      this.totalPointsPosition = x + width / 2 - 4
    }
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
