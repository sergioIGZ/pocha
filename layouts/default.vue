<template>
  <div id="app">
    Pocha!
    <nuxt-child />
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
  margin: 4px;
  @apply font-bold py-2 px-4 rounded;
  @apply bg-green-500 text-white;
}
button:hover {
  @apply bg-green-700;
}
</style>
