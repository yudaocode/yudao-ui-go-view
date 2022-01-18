import Radar from './index.vue'
import image from '@/assets/images/chart/charts/radar.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const RadarConfig: ConfigType = {
  key: 'VRadar',
  title: '雷达',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  node: Radar,
  image: image
}
