import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { BorderThirteenthConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#6586ec', '#2cf7fe']
}

export default class Config extends publicConfig
  implements CreateComponentType {
  public key = BorderThirteenthConfig.key
  public chartConfig = cloneDeep(BorderThirteenthConfig)
  public option = option
}
