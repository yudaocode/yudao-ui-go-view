import { getUUID } from '@/utils'
import { PublicConfigType } from '@/packages/index.d'
import { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import {
  RequestHttpEnum,
  RequestDataTypeEnum,
  RequestHttpIntervalEnum,
  RequestContentTypeEnum,
  RequestBodyEnum
} from '@/enums/httpEnum'
import { chartInitConfig } from '@/settings/designSetting'

const requestConfig: RequestConfigType = {
  requestDataType: RequestDataTypeEnum.STATIC,
  requestHttpType: RequestHttpEnum.GET,
  requestUrl: '',
  requestInterval: undefined,
  requestIntervalUnit: RequestHttpIntervalEnum.SECOND,
  requestContentType: RequestContentTypeEnum.DEFAULT,
  requestParamsBodyType: RequestBodyEnum.NONE,
  requestSQLContent: {
    sql: 'select * from  where'
  },
  requestParams: {
    Body: {
      'form-data': {},
      'x-www-form-urlencoded': {},
      json: '',
      xml: ''
    },
    Cookie: {},
    Header: {},
    Params: {}
  }
}

export class publicConfig implements PublicConfigType {
  public id = getUUID()
  // 重命名
  public rename = undefined
  // 基本信息
  public attr = { ...chartInitConfig, zIndex: -1 }
  // 基本样式
  public styles = {
    // 色相
    hueRotate: 0,
    // 饱和度
    saturate: 1,
    // 对比度
    contrast: 1,
    // 亮度
    brightness: 1,
    // 透明
    opacity: 1,

    // 旋转
    rotateZ: 0,
    rotateX: 0,
    rotateY: 0,

    // 倾斜
    skewX: 0,
    skewY: 0,

    // 动画
    animations: []
  }
  // 请求
  public request = { ...requestConfig }
  // 数据过滤
  public filter = undefined

  // 设置坐标
  public setPosition(x: number, y: number): void {
    this.attr.x = x
    this.attr.y = y
  }
}
