import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { LineCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import omit from 'lodash/omit'

export default class Config extends publicConfig implements CreateComponentType {
  public key: string = LineCommonConfig.key

  public chartData = omit(LineCommonConfig, ['node'])

  // 图表配置项
  public option = echartOptionProfixHandle({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      },
      {
        data: [130, 130, 312, 268, 155, 117, 160],
        type: 'line'
      }
    ]
  })

  // 设置坐标
  public setPosition(x: number, y: number): void {
    this.attr.x = x
    this.attr.y = y
  }
}