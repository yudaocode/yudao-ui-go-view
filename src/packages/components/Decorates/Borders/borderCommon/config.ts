import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import {BorderCommonConfig} from './index'
import cloneDeep from 'lodash/cloneDeep'

export default class Config extends publicConfig implements CreateComponentType {
  public key = BorderCommonConfig.key
  public chartConfig = cloneDeep(BorderCommonConfig)
  public borderOptions = {
    colors: ['#6586ec', '#2cf7fe']
  }
}
