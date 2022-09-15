import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { ScatterMuitDataConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis']

export const seriesItem = {
  type: 'scatter',
  emphasis: {
    focus: 'series'
  },
  symbolSize: 12,

  markArea: {
    silent: true,
    itemStyle: {
      color: 'transparent',
      borderWidth: 1,
      borderType: 'dashed'
    },
    data: [
      [
        {
          xAxis: 'min',
          yAxis: 'min'
        },
        {
          xAxis: 'max',
          yAxis: 'max'
        }
      ]
    ]
  },

  markPoint: {
    symbol: 'pin',
    symbolSize: 50,
    data: [
      { type: 'max', name: 'Max' },
      { type: 'min', name: 'Min' }
    ]
  }
}

export const option = {
  dataset: dataJson,
  tooltip: {
    showDelay: 0,
    axisPointer: {
      show: true,
      type: 'cross',
      lineStyle: {
        type: 'dashed',
        width: 1
      }
    }
  },

  legend: {},

  xAxis: {
    type: 'value',
    scale: true,
    splitLine: {
      show: false
    }
  },

  yAxis: {
    type: 'value',
    scale: true,
    splitLine: {
      show: false
    }
  },

  series: dataJson.map((item, index) => ({
    ...seriesItem,
    datasetIndex: index
  }))
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ScatterMuitDataConfig.key
  public chartConfig = cloneDeep(ScatterMuitDataConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
