<template>
  <div v-if="isVisible" class="root">
    <div @click="close" class="veil" />
    <div
      :class="{
        isError: type === 'error',
        isInfo: type === 'info',
        isSuccess: type === 'success'
      }"
      class="z-10 border px-4 py-3 rounded relative w-full"
      role="alert"
    >
      <strong class="font-bold">{{ title }}</strong>
      <span class="block sm:inline">{{ message }}</span>
      <div v-if="yesNoButtons">
        <button @click="onYesClick">Si</button>
        <button @click="onNoClick">No</button>
      </div>
      <span
        @click="close"
        class="icon-cross absolute top-0 right-0 px-3 py-3 text-xs"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheAlert',
  computed: {
    ...mapState({
      isVisible: state => state.alert.isVisible,
      type: state => state.alert.type,
      title: state => state.alert.title,
      message: state => state.alert.message,
      yesNoButtons: state => state.alert.yesNoButtons,
      yesAction: state => state.alert.yesAction,
      noAction: state => state.alert.noAction
    })
  },
  methods: {
    close() {
      this.$store.commit('closeAlert')
    },
    onYesClick() {
      if (this.yesAction) this.yesAction()
      this.close()
    },
    onNoClick() {
      if (this.noAction) this.noAction()
      this.close()
    }
  }
}
</script>

<style scoped>
.root {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
.isSuccess {
  @apply bg-green-100 border-green-400 text-green-700;
}
.isError {
  @apply bg-red-100 border-red-400 text-red-700;
}
.isInfo {
  @apply bg-blue-100 border-blue-400 text-blue-700;
}
.veil {
  @apply bg-gray-800;
  height: 110vh;
  width: 100%;
  opacity: 0.7;
  z-index: 1;
  position: absolute;
  top: -50px;
}
</style>
