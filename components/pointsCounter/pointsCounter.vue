<template>
  <div class="points-action">
    <icon-button @click="$emit('change', points - 1)">
      <span class="icon-minus" />
    </icon-button>
    <input
      @change="$emit('change', Number($event))"
      v-model="points"
      readonly
      class="bet"
      type="number"
    />
    <icon-button @click="$emit('change', points + 1)">
      <span class="icon-plus" />
    </icon-button>
  </div>
</template>

<script>
import IconButton from '../iconButton/iconButton'
export default {
  name: 'PointsCounter',
  components: { IconButton },
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
input {
  text-align: center;
  padding: 0.25rem 0;
}
</style>
