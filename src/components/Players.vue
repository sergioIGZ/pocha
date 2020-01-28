<template>
  <div>
    <ul class="players-list">
      <li v-for="(player, index) in players" :key="index">{{player}}</li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Players',
  data() {
    return {
      players: ['Kami', 'Paloma', 'Roma']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.players-list {
  list-style: none;
  padding: 0;
}
.players-list li {
  padding: 8px;
}
</style>
