import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { WeatherConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'



export const option = {
  dataset: '',
  //天气样式
  weatherStyleType:94,
  //天气图标类型
  weatherIconType:1,
  //整体大小
  weatherSite:10,
  //天气地址
  weatherAddress:'beijing',
  //字体颜色
  weatherColor:'#FFFFFFFF',
  //背景颜色
  weatherBgColor:'#00000000',
  //圆角
  weatherBorderRadius:1
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = WeatherConfig.key
  public attr = { ...chartInitConfig, h: 500, zIndex: -1 }
  public chartConfig = cloneDeep(WeatherConfig)
  public option = cloneDeep(option)
}