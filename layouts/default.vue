<template>
  <div id="app">
    <div class="text-purple-700 text-xl font-extrabold p-2">
      Pocha!
    </div>
    <the-alert />
    <nuxt-child />
  </div>
</template>

<script>
import TheAlert from '@/components/theAlert/theAlert'
export default {
  components: { TheAlert }
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  @apply text-gray-800 bg-gray-200;
}
button {
  margin: 4px;
  @apply font-bold py-2 px-4 rounded;
  @apply bg-green-500 text-white shadow-lg;
}
button:hover {
  @apply bg-green-700;
}
input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
input:focus {
  @apply outline-none shadow-outline;
}
</style>
