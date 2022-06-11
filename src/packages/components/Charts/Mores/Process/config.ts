import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ProcessConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: 0,
  type: "circle",
  percentage: 0,
  color: '#F8B10AFF',
  indicatorPlacement:"outside"
}

export default class Config extends publicConfig implements CreateComponentType {
  public key = ProcessConfig.key
  public chartConfig = cloneDeep(ProcessConfig)
  public option = cloneDeep(option)
}