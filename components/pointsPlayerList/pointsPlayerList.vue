<template>
  <div>
    <div class="flex relative w-full h-6">
      <div
        :style="{ left: `${totalBetsPosition}px` }"
        :class="{
          'text-red-500 font-bold': totalBets === maxPoints
        }"
        class="absolute"
      >
        <span class="absolute">{{ totalBets }}</span>
        <span v-if="totalBets === maxPoints" class="absolute animate-ping">
          {{ totalBets }}
        </span>
      </div>
      <div
        :style="{ left: `${totalPointsPosition}px` }"
        :class="{ 'text-red-500': totalPoints !== maxPoints }"
        class="absolute rounded-full"
      >
        {{ totalPoints }}
      </div>
    </div>
    <div v-if="isEditing">
      <button @click="$emit('cancel-edit')" class="bg-red-500">
        <span class="icon-cross" />
      </button>
      <button @click="$emit('save-edit', playerPoints)" class="bg-green-500">
        <span class="icon-checkmark" />
      </button>
    </div>
    <ul v-show="players.length" class="players-list">
      <li
        v-for="(player, index) in players"
        :key="index"
        @click="onUserClick(player)"
      >
        <div class="flex left text-gray-700 items-center">
          <div
            :class="{
              'icon-trophy text-yellow-500':
                player.totalPoints === bestPoints.first,
              'icon-trophy text-gray-500':
                player.totalPoints === bestPoints.second,
              'icon-trophy text-orange-600':
                player.totalPoints === bestPoints.third
            }"
            class="pr-1"
          />
          <div class="truncate">{{ player.name }}</div>
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
        <div class="right flex items-center justify-end">
          <input v-if="isEditing" v-model="playerPoints[index]" />
          <span v-else :class="{ isRed: !player.hasWon }">
            {{ player.totalPoints }}
          </span>
          <div class="flex flex-col text-xs pl-1">
            <div class="text-green-500">{{ player.roundsWon }}</div>
            <div class="text-red-500">{{ player.roundsLost }}</div>
          </div>
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
    showDelete: { type: Boolean, required: false, default: true },
    isEditing: { type: Boolean, required: false, default: false }
  },
  data() {
    return {
      totalBetsPosition: 0,
      totalPointsPosition: 0,
      playerPoints: this.players.map(player => player.totalPoints)
    }
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
    },
    bestPoints() {
      const sortedList = [...this.players]
      sortedList.sort(({ totalPoints: a }, { totalPoints: b }) => b - a)
      return sortedList.reduce(
        (acc, player) => {
          if (player.totalPoints >= acc.first) {
            acc.first = player.totalPoints
          } else if (player.totalPoints >= acc.second) {
            acc.second = player.totalPoints
          } else if (player.totalPoints >= acc.third) {
            acc.third = player.totalPoints
          }
          return acc
        },
        { first: -1000, second: -1000, third: -1000 }
      )
    }
  },
  watch: {
    isEditing(newVal) {
      if (newVal)
        this.playerPoints = this.players.map(player => player.totalPoints)
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
  border-bottom: 1px solid #dddddd;
  @apply py-2 px-1;
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
  width: 55%;
  display: flex;
  align-items: center;
}
.right {
  width: 16%;
  text-align: right;
}
</style>
