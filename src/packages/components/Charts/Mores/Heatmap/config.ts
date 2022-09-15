import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { HeatmapConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import {cloneDeep} from 'lodash'
import dataJson from './data.json'

export const includes = ['legend']

export const option = {
  tooltip: {},
  legend: {},
  xAxis: {
    type: 'category',
    data: dataJson.xAxis
  },
  yAxis: {
    type: 'category',
    data: dataJson.yAxis
  },
  dataset: { ...dataJson },
  visualMap: {
    min: 0,
    max: 1,
    calculable: true,
    realtime: false,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
      ]
    }
  },
  series:[
    {
      name: '',
      type: 'heatmap',
      data: dataJson.seriesData,
      emphasis: {
        itemStyle: {
          borderColor: '#333',
          borderWidth: 1
        }
      },
      progressive: 1000,
      animation: false
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = HeatmapConfig.key
  public chartConfig = cloneDeep(HeatmapConfig)

  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}