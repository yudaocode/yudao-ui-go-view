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

  // visualMap: {
  //   min: 0,
  //   max: 360,
  //   dimension: 1,
  //   orient: 'vertical',
  //   right: 10,
  //   top: 'center',
  //   text: ['高', '低'],
  //   calculable: true,
  //   inRange: {
  //     color: ['#f2c31a', '#24b7f2']
  //   }
  // },

  xAxis: {
    type: 'value',
    scale: true,
    // axisLabel: {
    //   formatter: '{value} cm'
    // },
    splitLine: {
      show: false
    }
  },

  yAxis: {
    type: 'value',
    scale: true,
    // axisLabel: {
    //   formatter: '{value} kg'
    // },
    splitLine: {
      show: false
    }
  },

  // series: [
  //   { ...seriesItem, datasetIndex: 0 },
  //   { ...seriesItem, datasetIndex: 1 }
  // ],

  series: dataJson.map((item, index) => ({
    ...seriesItem,
    // name: (item.dimensions && item.dimensions[0]) || `data${index}`,
    datasetIndex: index
  }))
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ScatterMuitDataConfig.key
  public chartConfig = cloneDeep(ScatterMuitDataConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
