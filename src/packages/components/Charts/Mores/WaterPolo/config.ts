import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { WaterPoloConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
  
export const option = {
  colors: ['#4fd2dd', '#235fa7'],
}

export default class Config extends publicConfig implements CreateComponentType {
  public key = WaterPoloConfig.key
  public chartConfig = cloneDeep(WaterPoloConfig)
  public option = option
}
