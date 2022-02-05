<template>
  <div class="go-canvas-setting">
    <ChartTheme />
  </div>
</template>

<script setup>
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
const chartEditStoreStore = useChartEditStoreStore()
import { ChartTheme } from './components/ChartTheme/index'
</script>

<style lang="scss" scoped>
@include go(canvas-setting) {
}
</style>
