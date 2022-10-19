import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { MapAmapConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: '',
  amapKey: 'aa76ad84f92f661980f710cbe966b7f6',
  amapStyleKey: 'normal',
  amapStyleKeyCustom: '',
  amapLon: 116.39,
  amapLat: 40.91,
  amapZindex: 10,
  viewMode: '2D',
  pitch: 60,
  skyColor: '#53A9DE',
  lang: 'zh_cn',
  features: ['bg', 'point', 'road', 'building']
}
export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = MapAmapConfig.key
  public attr = { ...chartInitConfig, w: 1000, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(MapAmapConfig)
  public option = cloneDeep(option)
}
