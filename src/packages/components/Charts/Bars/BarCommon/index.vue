<template>
  <div>
    这里是柱状图组件渲染
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  chart: {
    type: Object,
    require: true
  }
})
</script>

<style lang="scss" scoped></style>
