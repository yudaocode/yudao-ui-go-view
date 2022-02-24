import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { BarCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import omit from 'lodash/omit'
import cloneDeep from 'lodash/cloneDeep'

export default class Config extends publicConfig implements CreateComponentType {
  public key = BarCommonConfig.key
  public chartData = omit(cloneDeep(BarCommonConfig), ['node'])

  // 图表配置项
  public option = echartOptionProfixHandle({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ["name1", "name2"]
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
        name: 'name1',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
      },
      {
        name: 'name2',
        type: 'bar',
        data: [130, 130, 312, 268, 155, 117, 160],
      }
    ]
  })
}