import TreeMap from './index.vue'
import image from '@/assets/images/chart/charts/tree_map.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TreeMapConfig: ConfigType = {
  key: 'VTreeMap',
  title: '树形分布',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  node: TreeMap,
  image: image
}
