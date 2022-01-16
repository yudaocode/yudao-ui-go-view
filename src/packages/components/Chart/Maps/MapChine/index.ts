import MapChine from './index.vue'
import image from '@/assets/images/chart/charts/map.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const MapChineConfig: ConfigType = {
  key: 'VMapChine',
  title: '北京地图',
  category: ChatCategoryEnum.MAP,
  node: MapChine,
  image: image
}
