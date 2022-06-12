import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ProcessConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: 36,
  type: "circle",
  color: '#4992FFFF',
  // 指标位置（线条时可用）
  indicatorPlacement: "outside"
}

export default class Config extends publicConfig implements CreateComponentType {
  public key = ProcessConfig.key
  public attr = {...chartInitConfig, h: 500, zIndex: -1}
  public chartConfig = cloneDeep(ProcessConfig)
  public option = cloneDeep(option)
}