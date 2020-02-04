<template>
  <div>
    Pocha!
    <router-view />
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
}
</script>

<style scoped>
.container {
  padding: 0 !important;
}
</style>
