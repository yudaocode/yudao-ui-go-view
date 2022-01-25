import Radar from './index.vue'
import image from '@/assets/images/chart/charts/radar.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const RadarConfig: ConfigType = {
  key: 'VRadar',
  title: '雷达',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  node: Radar,
  image: image
}
