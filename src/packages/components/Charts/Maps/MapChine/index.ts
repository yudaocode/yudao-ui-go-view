import MapChine from './index.vue'
import Configuration from './config.vue'
import image from '@/assets/images/chart/charts/map.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MapChineConfig: ConfigType = {
  key: 'VMapChine',
  conKey: 'VCMapChine',
  title: '北京地图',
  category: ChatCategoryEnum.MAP,
  categoryName: ChatCategoryEnumName.MAP,
  package: PackagesCategoryEnum.CHARTS,
  node: () => MapChine,
  conNode: () => Configuration,
  image: image
}
