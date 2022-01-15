import node from './index.vue'
import image from '@/assets/images/chart/charts/pie.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const pieCommonConfig: ConfigType = {
  key: 'PieCommon',
  title: '饼图',
  category: ChatCategoryEnum.PIE,
  node: node,
  image
}
