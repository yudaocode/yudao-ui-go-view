import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { LineGradientsConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { graphic } from 'echarts/core'

export const includes = ['legend', 'xAxis', 'yAxis']

const option = {
  legend: {
    show: true
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  xAxis: {
    show: true,
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    show: true,
    type: 'value'
  },
  series: [
    {
      name: 'data1',
      type: 'line',
      smooth: false,
      lineStyle: {
        normal: {
          width: 3
        }
      },
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(25,163,223,.3)'
          },
          {
            offset: 1,
            color: 'rgba(25,163,223, 0)'
          }
        ])
      },
      data: [120, 200, 150, 80, 70, 110, 130]
    },
    {
      name: 'data2',
      type: 'line',
      smooth: false,
      lineStyle: {
        normal: {
          width: 3
        }
      },
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(0,202,149,0.3)'
          },
          {
            offset: 1,
            color: 'rgba(0,202,149,0)'
          }
        ])
      },
      data: [130, 130, 312, 268, 155, 117, 160]
    }
  ]
}

export default class Config extends publicConfig
  implements CreateComponentType {
  public key: string = LineGradientsConfig.key
  public chartConfig = LineGradientsConfig
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
