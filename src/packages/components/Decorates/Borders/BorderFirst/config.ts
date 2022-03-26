import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import {BorderFirstConfig} from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dur: 0.5,
  colors: ['#4fd2dd', '#235fa7']
} 

export default class Config extends publicConfig implements CreateComponentType {
  public key = BorderFirstConfig.key
  public chartConfig = cloneDeep(BorderFirstConfig)
  public option = option
}
