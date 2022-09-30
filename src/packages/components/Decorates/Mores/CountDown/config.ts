import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CountDownConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'
import { FlipType } from '@/components/Flipper'

type STYLE = '时分秒' | '冒号'

export interface OptionType {
  dataset: number
  fixedDate: boolean
  endDate: number
  style: STYLE
  showDay: boolean
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
  dataset: 10 * 60, // 10分钟
  fixedDate: false,
  endDate: new Date().getTime(), // 当前时间
  style: '时分秒',
  showDay: true,
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
  public key = CountDownConfig.key
  public attr = { ...chartInitConfig, w: 950, h: 160, zIndex: -1 }
  public chartConfig = cloneDeep(CountDownConfig)
  public option = cloneDeep(option)
}
