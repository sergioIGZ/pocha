<template>
  <div class="points-action">
    <v-btn class="mx-2" @click="$emit('change', points - 1)" fab small color="primary">
      -
    </v-btn>
    <v-text-field class="bet" type="number" @change="$emit('change', Number($event))" v-model="points" />
    <v-btn class="mx-2" @click="$emit('change', points + 1)" fab small color="primary">
      +
    </v-btn>
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
  methods: {
  }
}
</script>

<style scoped>
  .points-action {
    display: flex;
    align-items: center;
  }
  .bet{
    width: 30px;
  }
</style>
