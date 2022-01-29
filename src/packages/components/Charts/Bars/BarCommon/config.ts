import { getUUID } from '@/utils'
import { BarCommonConfig } from './index'
import { ConfigType } from '@/packages/index.d'
import omit from 'lodash/omit'

export default class Config {
  private id: string = getUUID()
  private key: string = BarCommonConfig.key

  chartData: Exclude<ConfigType, ['node']> = omit(BarCommonConfig, ['node'])

  public attr = { x: 0, y: 0, w: 500, h: 300 }

  // 图表配置项
  public config = {
    backgroundColor: 'rgba(0,0,0,0)',
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
  }

  // 设置坐标
  public setPosition(x: number, y: number): void {
    this.attr.x = x
    this.attr.y = y
  }
}
