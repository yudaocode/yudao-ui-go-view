import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { BarCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'

export const includes = ['legend', 'xAxis', 'yAxis', 'dataset']

export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      show: true,
      type: 'shadow'
    }
  },
  legend: {
    show: true
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: {
    show: true,
    type: 'value'
  },
  series: [
    {
      type: 'bar',
      barWidth: null,
      itemStyle: {
        color: null,
        borderRadius: 0
      }
    },
    {
      type: 'bar',
      barWidth: null,
      itemStyle: {
        color: null,
        borderRadius: 0
      }
    }
  ]
}

export default class Config extends publicConfig
  implements CreateComponentType {
  public key = BarCommonConfig.key
  public chartConfig = cloneDeep(BarCommonConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
