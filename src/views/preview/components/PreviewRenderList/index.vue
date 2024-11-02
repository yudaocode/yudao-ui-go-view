<template>
  <div
    class="chart-item"
    v-for="(item, index) in chartEditStore.componentList"
    :class="[animationsIsOpenClass(item.styles), !item.isGroup && 'hidden',getAnimationsRepeatClass(item.styles)]"
    :key="item.id"
    :style="{
      ...getComponentAttrStyle(item.attr, index),
      ...getFilterStyle(item.styles),
      ...getTransformStyle(item.styles),
      ...getStatusStyle(item.status),
      ...getPreviewConfigStyle(item.preview),
      ...getBlendModeStyle(item.styles) as any,
      ...getAnimationsPlayDurationStyle(item.styles),
      ...getAnimationsCurveStyle(item.styles),
      ...getAnimationsPlayDelayStyle(item.styles),
      ...getSizeStyle(item.attr)
    }"
  >
    <!-- 分组 -->
    <preview-render-group
      v-if="item.isGroup"
      :groupData="(item as CreateComponentGroupType)"
      :groupIndex="index"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
    ></preview-render-group>

    <!-- 单组件 -->
    <component
      v-else
      :is="item.chartConfig.chartKey"
      :id="item.id"
      :chartConfig="item"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
      :style="{
        ...getSizeStyle(item.attr),
        ...getFilterStyle(item.styles)
      }"
      v-on="useLifeHandler(item)"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted } from 'vue'
import { useChartDataPondFetch } from '@/hooks'
import { ChartEditStorageType } from '../../index.d'
import { PreviewRenderGroup } from '../PreviewRenderGroup/index'
import { CreateComponentGroupType } from '@/packages/index.d'
import { chartColors } from '@/settings/chartThemes/index'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import {
  animationsClass,
  getFilterStyle,
  getTransformStyle,
  getBlendModeStyle,
  getAnimationsPlayDurationStyle,
  getAnimationsRepeatStyle,
  getAnimationsRepeatClass,
  animationsIsOpenClass,
  getAnimationsCurveStyle,
  getAnimationsPlayDelayStyle,
  colorCustomMerge
} from '@/utils'
import { getSizeStyle, getComponentAttrStyle, getStatusStyle,getPreviewConfigStyle } from '../../utils'
import { useLifeHandler } from '@/hooks'
type ChartEditStoreType = typeof useChartEditStore
// 初始化数据池
const { initDataPond, clearMittDataPondMap } = useChartDataPondFetch()
const chartEditStore = useChartEditStore()

// const props = defineProps({
//   localStorageInfo: {
//     type: Object as PropType<ChartEditStorageType>,
//     required: true
//   }
// })

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting = chartEditStore.editCanvasConfig.chartThemeSetting
  return chartThemeSetting
})

// 配置项
const themeColor = computed(() => {
  console.log("chartEditStore.componentList:",chartEditStore.componentList)
  const colorCustomMergeData = colorCustomMerge(chartEditStore.editCanvasConfig.chartCustomThemeColorInfo)
  return colorCustomMergeData[chartEditStore.editCanvasConfig.chartThemeColor]
})

// 组件渲染结束初始化数据池
clearMittDataPondMap()
onMounted(() => {
  initDataPond(useChartEditStore)
})
</script>

<style lang="scss" scoped>
.chart-item {
  position: absolute;
  &.hidden {
    overflow: hidden;
  }
}

.my-animate-repeat{
  //--animate-repeat: infinite;//循环
  //--animate__infinite;
}
.animate__rotateIn{
  //animation-timing-function:linear;//曲线
  animation-name: box;//动画
  //animation-delay: 5s;//延迟
  //animation-fill-mode: forwards;
}

@keyframes box {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}

@keyframes box2 {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(-360deg)
  }
}

@keyframes box3 {
  0% {
    transform: rotate(0deg)
  }
  50% {
    transform: rotate(-365deg)
  }
  100% {
    transform: rotate(0deg)
  }
}


@keyframes box4 {
  0% {
    transform: rotate(0deg)
  }
  50% {
    transform: rotate(365deg)
  }
  100% {
    transform: rotate(0deg)
  }
}

</style>
