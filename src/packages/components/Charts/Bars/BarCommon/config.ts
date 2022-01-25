import { getUUID } from '@/utils'
import { BarCommonConfig } from './index'

export default class Config {
  id: string = getUUID()
  key: string = BarCommonConfig.key
  attr = { x: 0, y: 0, w: 500, h: 300 }

  // 图表配置项
  public config = {
    global: {}
  }

  // 设置坐标
  setPosition(x: number, y: number) {
    this.attr.x = x
    this.attr.y = y
  }
}
