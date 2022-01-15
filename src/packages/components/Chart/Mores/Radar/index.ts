import Radar from './index.vue'
import image from '@/assets/images/chart/charts/radar.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const RadarConfig: ConfigType = {
  key: 'Radar',
  title: '雷达',
  category: ChatCategoryEnum.MORE,
  node: Radar,
  image: image
}
