import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TableCategoryConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#3faacb', '#fff'],
}

export default class Config extends publicConfig implements CreateComponentType {
  public key = TableCategoryConfig.key
  public chartConfig = cloneDeep(TableCategoryConfig)
  public option = option
}
