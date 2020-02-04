<template>
  <div id="app">
    Pocha!
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  padding: 8px;
  border: 1px solid #dddddd;
  margin: 4px;
}
</style>
