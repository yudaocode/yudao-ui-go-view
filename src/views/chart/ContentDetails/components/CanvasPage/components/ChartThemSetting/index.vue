<template>
  <GlobalSetting :data="chartThemeSetting" />
</template>

<script setup lang="ts">
import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { GlobalSetting } from '@/components/ConfigItemCom/index'

const chartEditStoreStore = useChartEditStoreStore()
const { chartThemeSetting } = chartEditStoreStore.getEditCanvasConfig
</script>