import BarCrossrange from './index.vue'
import image from '@/assets/images/chart/charts/bar_y.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const BarCrossrangefig: ConfigType = {
  key: 'VBarCrossrange',
  title: '横向柱状图',
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  node: BarCrossrange,
  image: image
}
