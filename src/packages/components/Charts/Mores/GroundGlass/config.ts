import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { GroundGlassConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'



export const option = {
  dataset: '',
  glassBackgroundColor:'rgba(35, 35, 36, 0.88)',
  glassBackdropFilterBlur:20,

}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = GroundGlassConfig.key
  public attr = { ...chartInitConfig, h: 500, zIndex: -1 }
  public chartConfig = cloneDeep(GroundGlassConfig)
  public option = cloneDeep(option)
}