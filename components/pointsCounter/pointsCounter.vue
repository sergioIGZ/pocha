<template>
  <div class="points-action">
    <button @click="$emit('change', points - 1)">
      -
    </button>
    <input
      @change="$emit('change', Number($event))"
      v-model="points"
      class="bet"
      type="number"
    />
    <button @click="$emit('change', points + 1)">
      +
    </button>
  </div>
</template>

<script>
export default {
  name: 'PointsCounter',
  props: {
    points: { type: Number, required: true }
  },
  data() {
    return {
      value: this.points
    }
  },
  methods: {}
}
</script>

<style scoped>
.points-action {
  display: flex;
  align-items: center;
}
.bet {
  width: 30px;
}
.smaller {
  width: 30px;
  height: 30px;
}
</style>
