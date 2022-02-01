import { getUUID } from '@/utils'
import { BarCrossrangefig } from './index'
import { ConfigType, CreateComponentType } from '@/packages/index.d'
import omit from 'lodash/omit'

export default class Config implements CreateComponentType {
  public id: string = getUUID()
  public key: string = BarCrossrangefig.key

  public chartData: Exclude<ConfigType, ['node']> = omit(BarCrossrangefig, ['node'])

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
      type: 'value',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'category'
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
