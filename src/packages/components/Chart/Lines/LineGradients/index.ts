import LineGradients from './index.vue'
import image from '@/assets/images/chart/charts/line_gradient2.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const LineGradientsConfig: ConfigType = {
  key: 'LineGradientSingle',
  title: '折线面积图',
  category: ChatCategoryEnum.LINE,
  node: LineGradients,
  image: image
}
