import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { ScatterBasicConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis']

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
    show: true,
    type: 'value',
    scale: true,
    splitLine: {
      show: false
    }
  },
  yAxis: {
    show: true,
    type: 'value',
    scale: true,
    splitLine: {
      show: false
    }
  },
  series: [
    {
      type: 'scatter',
      emphasis: {
        focus: 'self'
      },
      symbolSize: 12
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ScatterBasicConfig.key
  public chartConfig = cloneDeep(ScatterBasicConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
