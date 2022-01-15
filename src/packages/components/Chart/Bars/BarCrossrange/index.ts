import BarCrossrange from './index.vue'
import image from '@/assets/images/chart/charts/bar_y.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const BarCrossrangefig: ConfigType = {
  key: 'BarCrossrange',
  title: '横向柱状图',
  category: ChatCategoryEnum.BAR,
  node: BarCrossrange,
  image: image
}
