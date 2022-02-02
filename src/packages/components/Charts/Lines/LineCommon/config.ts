import { getUUID } from '@/utils'
import { echartOptionProfixHandle } from '@/packages/utils/chart'
import { LineCommonConfig } from './index'
import { ConfigType, CreateComponentType } from '@/packages/index.d'
import omit from 'lodash/omit'

export default class Config implements CreateComponentType {
  public id: string = getUUID()
  public key: string = LineCommonConfig.key

  public chartData: Exclude<ConfigType, ['node']> = omit(LineCommonConfig, ['node'])

  public attr = { x: 0, y: 0, w: 500, h: 300 }

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
      }
    ]
  })

  // 设置坐标
  public setPosition(x: number, y: number): void {
    this.attr.x = x
    this.attr.y = y
  }
}