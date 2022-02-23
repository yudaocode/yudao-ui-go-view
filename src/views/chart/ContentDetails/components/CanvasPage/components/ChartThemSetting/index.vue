<template>
  <GlobalSetting :data="chartThemeSetting" />
</template>

<script setup lang="ts">
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { GlobalSetting } from '@/components/ChartItemSetting/index'

const chartEditStoreStore = useChartEditStoreStore()
const { chartThemeSetting } = chartEditStoreStore.getEditCanvasConfig
</script>