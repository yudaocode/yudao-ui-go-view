import barCommon from './index.vue'
import image from '@/assets/images/chart/bar_y.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

// 柱状图
export const barCommonConfig: ConfigType = {
  key: 'BarCommon',
  title: '基础',
  category: ChatCategoryEnum.BAR,
  node: barCommon,
  image: image
}
