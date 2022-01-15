import Heatmap from './index.vue'
import image from '@/assets/images/chart/charts/heatmap.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const HeatmapConfig: ConfigType = {
  key: 'Heatmap',
  title: '热力图',
  category: ChatCategoryEnum.MORE,
  node: Heatmap,
  image: image
}
