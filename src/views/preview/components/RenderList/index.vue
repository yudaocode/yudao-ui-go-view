<template>
  <div
    class="chart-item"
    v-for="(item, index) in localStorageInfo.componentList"
    :key="item.id"
    :style="{ ...useComponentStyle(item.attr, index), ...useSizeStyle(item.attr) }"
  >
    <component
      :is="item.key"
      :chartConfig="item"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { ChartEditStorageType } from '../../index.d'
import { chartColors } from '@/settings/chartThemes/index'
import { useSizeStyle, useComponentStyle } from '../../hooks/useStyle.hook'
import { componentPackageInstall } from '@/utils'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  localStorageInfo: {
    type: Object as PropType<ChartEditStorageType>,
    required: true
  }
})

// 动态注册
props.localStorageInfo.componentList.forEach((e: CreateComponentType) => {
  componentPackageInstall(e.chartConfig)
});

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting = props.localStorageInfo.editCanvasConfig.chartThemeSetting
  return chartThemeSetting
})

// 配置项
const themeColor = computed(() => {
  const chartThemeColor = props.localStorageInfo.editCanvasConfig.chartThemeColor
  return chartColors[chartThemeColor]
})

</script>

<style lang="scss" scoped>
.chart-item {
  position: absolute;
}
</style>
