import Point from './index.vue'
import image from '@/assets/images/chart/charts/Point.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const PointConfig: ConfigType = {
  key: 'VPoint',
  title: '热力图',
  category: ChatCategoryEnum.MORE,
  node: Point,
  image: image
}
