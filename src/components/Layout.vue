<template>
  <v-app id="inspire">
      Pocha!
      <router-view/>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  }
}
</script>

<style scoped>
  .container {
    padding: 0 !important;
  }
</style>
