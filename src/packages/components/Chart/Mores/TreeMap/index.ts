import TreeMap from './index.vue'
import image from '@/assets/images/chart/charts/tree_map.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const TreeMapConfig: ConfigType = {
  key: 'TreeMap',
  title: '树形分布',
  category: ChatCategoryEnum.MORE,
  node: TreeMap,
  image: image
}
