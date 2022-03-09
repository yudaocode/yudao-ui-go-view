<template>
  <div
    class="chart-item"
    :class="animationsClass(item.styles.animations)"
    v-for="(item, index) in localStorageInfo.componentList"
    :key="item.id"
    :style="{ ...useComponentAttrStyle(item.attr, index), ...useSizeStyle(item.attr), ...useStyle(item.styles)}"
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
import { useSizeStyle, useStyle, useComponentAttrStyle, animationsClass } from '../../utils'

const props = defineProps({
  localStorageInfo: {
    type: Object as PropType<ChartEditStorageType>,
    required: true
  }
})

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
