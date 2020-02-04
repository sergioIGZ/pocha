<template>
  <div>
    Pocha!
    <router-view/>
  </div>
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
