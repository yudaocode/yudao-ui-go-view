import { echartOptionProfixHandle, publicConfig } from '@/packages/utils'
import { BarCommonConfig } from './index'
import { ConfigType, CreateComponentType } from '@/packages/index.d'
import omit from 'lodash/omit'

export default class Config extends publicConfig implements CreateComponentType {
  public key = BarCommonConfig.key
  public chartData: Exclude<ConfigType, ['node']> = omit(BarCommonConfig, ['node'])

  // 图表配置项
  public option = echartOptionProfixHandle({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  })
}