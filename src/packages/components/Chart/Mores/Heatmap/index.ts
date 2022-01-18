import Heatmap from './index.vue'
import image from '@/assets/images/chart/charts/heatmap.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const HeatmapConfig: ConfigType = {
  key: 'VHeatmap',
  title: '热力图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  node: Heatmap,
  image: image
}
