import { getUUID } from '@/utils'

export class Config {
  name: string = 'BarCommon'
  id: string = getUUID()
  attr = { w: 500, h: 300 }
  // 图表的
  public config = {
    global: {}
  }
}
