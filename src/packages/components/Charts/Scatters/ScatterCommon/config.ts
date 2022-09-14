import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { ScatterCommonConfig } from './index'
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
  dataset: { ...dataJson },
  tooltip: {
    // trigger: 'axis',
    showDelay: 0,
    formatter: function (params: { value: string | any[]; seriesName: string; name: string }) {
      if (params.value.length > 1) {
        return params.seriesName + ' :<br/>' + params.value[0] + 'cm ' + params.value[1] + 'kg '
      } else {
        return params.seriesName + ' :<br/>' + params.name + ' : ' + params.value + 'kg '
      }
    },
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

  xAxis: [
    {
      type: 'value',
      scale: true,
      // axisLabel: {
      //   formatter: '{value} cm'
      // },
      splitLine: {
        show: false
      }
    }
  ],

  yAxis: [
    {
      type: 'value',
      scale: true,
      // axisLabel: {
      //   formatter: '{value} kg'
      // },
      splitLine: {
        show: false
      }
    }
  ],

  // series: [
  //   {
  //     name: 'Data1',
  //     type: 'scatter',
  //     emphasis: {
  //       focus: 'series'
  //     },
  //     // symbolSize: 12,
  //     symbolSize: (item: number[]) => (item[1] / item[0]) * 30,
  //     datasetIndex: 0
  //   },
  //   {
  //     name: 'Data2',
  //     type: 'scatter',
  //     emphasis: {
  //       focus: 'series'
  //     },
  //     // symbolSize: 12,
  //     symbolSize: (item: number[]) => (item[1] / item[0]) * 30,
  //     datasetIndex: 1
  //   }
  // ]

  series: dataJson.map((item, index) => ({
    ...seriesItem,
    name: item.dimensions[0],
    datasetIndex: index
  }))
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ScatterCommonConfig.key
  public chartConfig = cloneDeep(ScatterCommonConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
