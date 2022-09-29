import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CountDownConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'

export enum FontWeightEnum {
  NORMAL = '常规',
  BOLD = '加粗'
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold'
}

export const option = {
  dataset: 203234,
  flipperLength: 6,
  flipperBgColor: '#ee6600FF',
  flipperTextColor: '#FFFFFFFF',
  flipperWidth: 60,
  flipperHeight: 100,
  flipperRadius: 10,
  flipperSpeed: 450
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CountDownConfig.key
  public attr = { ...chartInitConfig, w: 500, h: 200, zIndex: -1 }
  public chartConfig = cloneDeep(CountDownConfig)
  public option = cloneDeep(option)
}
