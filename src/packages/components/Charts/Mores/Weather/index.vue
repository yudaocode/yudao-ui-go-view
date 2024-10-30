<template>
  <div  :style="{borderRadius:weatherBorderRadius+'px'}">
    <iframe :width="w" :height="h" frameborder="0" scrolling="no" hspace="0"
            :style="{borderRadius:weatherBorderRadius+'px'}"
            :src="`https://i.tianqi.com?c=code&id=${weatherStyleType}&num=2&icon=${weatherIconType}&site=${weatherSite}&py=${weatherAddress}&color=${weatherColor.replace(/#/g,'%23')}&bgc=${weatherBgColor.replace(/#/g,'%23')}`"></iframe>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, watch, shallowReactive } from 'vue'

import config, { option as configOption } from './config'


const props = defineProps({
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

// 取配置数据
const { w, h } = toRefs(props.chartConfig.attr)
const {
  dataset,
  weatherStyleType,
  weatherIconType,
  weatherSite,
  weatherAddress,
  weatherColor,
  weatherBgColor,
  weatherBorderRadius
} = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: configOption.dataset
})

// 手动更新
// watch(
//   () => props.chartConfig.option.dataset,
//   (newData: any) => {
//     try {
//       option.dataset = toNumber(newData, 2)
//     } catch (error) {
//       console.log(error)
//     }
//   },
//   {
//     deep: false
//   }
// )
// 预览更新
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: number) => {
//   option.dataset = toNumber(newData, 2)
// })
</script>
