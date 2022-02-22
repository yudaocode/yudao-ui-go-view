<template>
  <div
    v-if="type === 'number'"
    :style="{ width: width ? width + 'px' : '100%' }"
  >
    <slot />
  </div>
  <div v-else :style="{ width: `${width}px` }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    required: false
  }
})
</script>

<style lang="scss" scoped></style>
