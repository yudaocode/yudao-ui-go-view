import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { VideoConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // 视频路径
  dataset: '',
  // 适应方式
  fit: 'contain',
  // 圆角
  borderRadius: 0,
  // 透明度
  opacity: 1
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VideoConfig.key
  public chartConfig = cloneDeep(VideoConfig)
  public option = cloneDeep(option)
}
