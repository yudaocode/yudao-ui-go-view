import {  PublicConfigClass } from '@/packages/public'
import { CapsuleChartConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'

import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'


export const option = {
  dataset:dataJson,
  colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
  unit: '',
  itemHeight:10,
  showValue: true
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = CapsuleChartConfig.key
  public attr = { ...chartInitConfig,w: 300, h: 200 ,zIndex: -1}
  public chartConfig = cloneDeep(CapsuleChartConfig)
  public option = cloneDeep(option)
}
