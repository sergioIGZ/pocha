<template>
  <button
    @click="$emit('click', $event)"
    :class="
      `bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded-full`
    "
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    color: {
      type: String,
      required: false,
      default: 'blue'
    }
  }
}
</script>

<style scoped>
button {
  width: 30px;
  height: 30px;
  font-size: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
