import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TextCommonConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export enum WritingModeEnum {
  HORIZONTAL = '水平',
  VERTICAL = '垂直',
}

export const WritingModeObject = {
  [WritingModeEnum.HORIZONTAL]: 'horizontal-tb',
  [WritingModeEnum.VERTICAL]: 'vertical-rl',
}

export const option = {
  dataset: '我是一个文本',
  fontSize: 20,
  fontColor: '#ffffffff',
  padding: 5,
  // 字间距
  letterSpacing: 5,
  borderRadius: 0,
  writingMode: 'horizontal-tb',
  backgroundColor: '#00000000',
}

export default class Config extends publicConfig implements CreateComponentType
{
  public key = TextCommonConfig.key
  public chartConfig = cloneDeep(TextCommonConfig)
  public option = cloneDeep(option)
}
