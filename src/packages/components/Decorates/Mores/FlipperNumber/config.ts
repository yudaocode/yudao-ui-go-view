import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { FlipperNumberConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'
import { FlipType } from '@/components/Flipper'

export interface OptionType {
  dataset: number | string
  flipperLength: number
  flipperBgColor: string
  flipperTextColor: string
  flipperWidth: number
  flipperHeight: number
  flipperRadius: number
  flipperGap: number
  flipperType: FlipType
  flipperSpeed: number
}

export const option: OptionType = {
  dataset: 3234,
  flipperLength: 6,
  flipperBgColor: '#253E4E',
  flipperTextColor: '#7CFFB2FF',
  flipperWidth: 60,
  flipperHeight: 100,
  flipperRadius: 10,
  flipperGap: 10,
  flipperType: 'down',
  flipperSpeed: 450
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = FlipperNumberConfig.key
  public attr = { ...chartInitConfig, w: 500, h: 160, zIndex: -1 }
  public chartConfig = cloneDeep(FlipperNumberConfig)
  public option = cloneDeep(option)
}
