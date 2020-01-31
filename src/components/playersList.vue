<template>
  <ul v-show="players.length" class="players-list">
    <li v-for="(player, index) in players" :key="index" @click="onUserClick(player)">
      <span>{{player}}</span>
      <v-btn v-if="showDelete" class="mx-2" @click="deletePlayer(player)" fab small color="secondary">
        <span class="icon-bin2"/>
      </v-btn>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'playersList',
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
    }
  }
}
</script>

<style scoped>
  .players-list {
    list-style: none;
    padding: 0;
    border: 1px solid #dddddd
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
</style>
