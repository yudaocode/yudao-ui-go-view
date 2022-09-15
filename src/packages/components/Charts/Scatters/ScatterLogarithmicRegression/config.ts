import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { SScatterLogarithmicRegressionConfig } from './index'
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

  legend: {
    data: dataJson
      .filter(i => i?.transform?.type === 'filter' && i?.transform?.config?.eq)
      .map(i => i.transform?.config?.eq?.toString())
  },

  xAxis: {
    show: true,
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  yAxis: {
    show: true,
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },

  visualMap: {
    show: false,
    dimension: 2,
    min: 20000,
    max: 1500000000,
    seriesIndex: [0, 1],
    inRange: {
      symbolSize: [10, 70]
    }
  },

  series: [
    {
      type: 'scatter',
      datasetIndex: 1
    },
    {
      type: 'scatter',
      datasetIndex: 2
    },
    {
      type: 'line',
      smooth: true,
      datasetIndex: 3,
      symbolSize: 0.1,
      symbol: 'circle',
      label: { show: true, fontSize: 16 },
      labelLayout: { dx: -20 },
      encode: { label: 2, tooltip: 1 }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = SScatterLogarithmicRegressionConfig.key
  public chartConfig = cloneDeep(SScatterLogarithmicRegressionConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
