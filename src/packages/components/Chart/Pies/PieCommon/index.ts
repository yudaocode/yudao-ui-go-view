import PieCommon from './index.vue'
import image from '@/assets/images/chart/charts/pie.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const PieCommonConfig: ConfigType = {
  key: 'VPieCommon',
  title: '计量图',
  category: ChatCategoryEnum.PIE,
  node: PieCommon,
  image
}
