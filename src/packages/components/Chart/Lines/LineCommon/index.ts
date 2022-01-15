import LineCommon from './index.vue'
import image from '@/assets/images/chart/charts/line.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const LineCommonConfig: ConfigType = {
  key: 'LineCommon',
  title: '折线图',
  category: ChatCategoryEnum.LINE,
  node: LineCommon,
  image: image
}
