import { echartOptionProfixHandle, publicConfig } from '@/packages/public'
import { BarCrossrangefig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import omit from 'lodash/omit'

export default class Config extends publicConfig implements CreateComponentType {
  public key: string = BarCrossrangefig.key

  public chartData = omit(BarCrossrangefig, ['node'])

  // 图表配置项
  public option = echartOptionProfixHandle({
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
  })

  // 设置坐标
  public setPosition(x: number, y: number): void {
    this.attr.x = x
    this.attr.y = y
  }
}
