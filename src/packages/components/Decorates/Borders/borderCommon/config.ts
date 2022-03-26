import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import {BorderCommonConfig} from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#6586ec', '#2cf7fe']
} 

export default class Config extends publicConfig implements CreateComponentType {
  public key = BorderCommonConfig.key
  public chartConfig = cloneDeep(BorderCommonConfig)
  public option = option
}
