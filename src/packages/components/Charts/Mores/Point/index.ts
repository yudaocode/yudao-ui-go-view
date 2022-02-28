import Point from './index.vue'
import Configuration from './config.vue'
import image from '@/assets/images/chart/charts/Point.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PointConfig: ConfigType = {
  key: 'VPoint',
  title: '热力图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  node: Point,
  conNode: () => Configuration,
  image: image
}
