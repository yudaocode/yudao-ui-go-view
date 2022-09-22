<template>
  <v-chart ref="vChartRef" :theme="themeColor" :option="option.value" :manual-update="isPreview()" autoresize>
  </v-chart>
</template>

<script setup lang="ts">
import { PropType, reactive, watch } from 'vue'
import config, { includes, MapDefaultConfig } from './config'
import VChart from 'vue-echarts'
import { use, registerMap, getMap } from 'echarts/core'
import { EffectScatterChart, MapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useChartDataFetch } from '@/hooks'
import { mergeTheme } from '@/packages/public/chart'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import mapJsonWithoutHainanIsLands from './mapWithoutHainanIsLands.json'

import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent
} from 'echarts/components'
const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

use([
  MapChart,
  DatasetComponent,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  EffectScatterChart,
  VisualMapComponent
])


const option = reactive({
  value:  mergeTheme(props.chartConfig.option, props.themeSetting, includes),
})



// const mapJsonModules:any = {}
// const files = import.meta.globEager('./mapGeojson/*.json')
// for (const key in files) {
//     const filename = key.replace(/(\.\/mapGeojson\/|\.(json))/g, "");
//     mapJsonModules[filename] = files[key].default || files[key]
// }
// //注册地图  同步
// const registerMapModules=()=>{
//   let adcode= props.chartConfig.option.mapRegion.adcode
//   registerMap(adcode, { geoJSON: mapJsonModules[adcode] as any, specialAreas: {} })
// }
// registerMapModules()


//动态获取json注册地图 
const getGeojson = (regionId: string) => {
  return new Promise<boolean>((resolve, reject) => {
    import(`./mapGeojson/${regionId}.json`).then(data => {
      registerMap(regionId, { geoJSON: data.default as any, specialAreas: {} })
      resolve(true)
    })
  })
}
//异步时先注册空的
registerMap(props.chartConfig.option.mapRegion.adcode, { geoJSON: {} as any, specialAreas: {} })
//保证初始化不报错
const registerMapModulesAsync= async ()=>{
  await getGeojson(props.chartConfig.option.mapRegion.adcode)
  //触发option 变动
  props.chartConfig.option.mapRegion.adcodeFlag=!props.chartConfig.option.mapRegion.adcodeFlag
  updateOptions()
}
registerMapModulesAsync()

const updateOptions = async () => {
  option.value = props.chartConfig.option
}
// 更换地图
const mapGeoHandle = (regionId: string) => {
  props.chartConfig.option.geo.map = regionId
  props.chartConfig.option.series.forEach((item: any) => {
    if (item.type === 'map') item.map = regionId
  })
  updateOptions()
}
const dataSetHandle = async (dataset: any) => {
  props.chartConfig.option.series.forEach((item: any) => {
    if (item.type === 'effectScatter' && dataset.point) item.data = dataset.point
    else if (item.type === 'map' && dataset.point) item.data = dataset.map
  })
  option.value = props.chartConfig.option
}
//是否显示南海群岛
const mapTypeHandle = async (show: boolean) => {
  if (show) {
    await getGeojson("china")
    // registerMap('china', { geoJSON:  mapJsonModules["china"] as any, specialAreas: {} })
    props.chartConfig.option.mapRegion.adcodeFlag=!props.chartConfig.option.mapRegion.adcodeFlag
  } else {
    registerMap('china', { geoJSON: mapJsonWithoutHainanIsLands as any, specialAreas: {} })
  }

  updateOptions()
}
//层级发生变化
const mapZoomHandle = async (newData: number) => {
  props.chartConfig.option.geo.zoom = newData
  updateOptions()
}
//区域发生变化
const mapRegionHandle = async (newData: string) => {
  await getGeojson(newData)
  // registerMapModules()
  mapGeoHandle(newData)
}

//监听数据发生变化
watch(
  () => props.chartConfig.option.dataset,
  newData => {
    dataSetHandle(newData)
  },
  {
    immediate: true,
    deep: false
  }
)
//监听是否显示南海群岛
watch(
  () => props.chartConfig.option.series[1].itemStyle.showHainanIsLands,
  newData => {
    mapTypeHandle(newData)
  },
  {
    deep: true,
    immediate: true
  }
)
//监听地图区域发生变化
watch(
  () => props.chartConfig.option.mapRegion.adcode,
  newData => {
    mapRegionHandle(newData)
  },
  {
    deep: true,
    immediate: true
  }
)
//监听大小发生变化
watch(
  () => props.chartConfig.option.series[1].zoom,
  newData => {
    mapZoomHandle(newData)
  },
  {
    deep: true,
    immediate: true
  }
)

// 预览
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  console.log('预览', newData)
  dataSetHandle(newData)
})
</script>
