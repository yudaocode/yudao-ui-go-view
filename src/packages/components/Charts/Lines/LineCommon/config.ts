import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { LineCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import omit from 'lodash/omit'

export const includes = ['legend', 'xAxis', 'yAxis']

const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  legend: {
    show: true
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
      lineStyle: {
        normal: {
          width: 3,
          color: {
            type: 'linear',

            colorStops: [
              {
                offset: 0,
                color: '#42a5f5' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#48D8BF' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          },
          shadowColor: 'rgba(68, 181, 226, 0.3)',
          shadowBlur: 5,
          shadowOffsetY: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#fff',
          borderWidth: 10,
          borderColor: '#42a5f5'
        }
      },
      data: [120, 200, 150, 80, 70, 110, 130]
    }
  ]
}

export default class Config extends publicConfig
  implements CreateComponentType {
  public key: string = LineCommonConfig.key
  public chartConfig = omit(LineCommonConfig, ['node', 'conNode'])
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
