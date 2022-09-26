import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ClockConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  border: 6,
  color: '#ffffff',
  bgColor: '#20b7af',
  borderColor: '#ffffff'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ClockConfig.key
  public chartConfig = cloneDeep(ClockConfig)
  public option = cloneDeep(option)
}
