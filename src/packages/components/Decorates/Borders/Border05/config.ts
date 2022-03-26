import { publicConfig } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Border05Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  borderTitle: '边框-04',
  borderTitleWidth: 250,
  borderTitleHeight: 32,
  borderTitleSize: 18,
  borderTitleColor: '#fff',
  colors: ['#1d48c4', '#d3e1f8']
}

export default class Config extends publicConfig implements CreateComponentType {
  public key = Border05Config.key
  public chartConfig = cloneDeep(Border05Config)
  public option = option
}
