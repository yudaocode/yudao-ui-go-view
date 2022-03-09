import { getUUID } from '@/utils'
import { PublicConfigType } from '@/packages/index.d'

export class publicConfig implements PublicConfigType {
  public id = getUUID()
  // 重命名
  public rename = undefined
  // 基本信息
  public attr = { x: 0, y: 0, w: 500, h: 300, zIndex: -1 }
  // 基本样式（动画，透明）
  public styles = {
    opacity: 1,
    animations: []
  }
  // 设置坐标
  public setPosition(x: number, y: number): void {
    this.attr.x = x
    this.attr.y = y
  }
}
