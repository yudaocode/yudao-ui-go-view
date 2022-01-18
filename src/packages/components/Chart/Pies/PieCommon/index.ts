import PieCommon from './index.vue'
import image from '@/assets/images/chart/charts/pie.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PieCommonConfig: ConfigType = {
  key: 'VPieCommon',
  title: '计量图',
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  node: PieCommon,
  image
}
