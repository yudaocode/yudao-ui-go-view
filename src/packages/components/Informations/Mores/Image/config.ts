import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ImageConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
}

export default class Config extends publicConfig implements CreateComponentType
{
  public key = ImageConfig.key
  public chartConfig = cloneDeep(ImageConfig)
  public option = cloneDeep(option)
}
