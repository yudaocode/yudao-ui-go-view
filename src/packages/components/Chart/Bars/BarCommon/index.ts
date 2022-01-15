import barCommon from './index.vue'
import image from '@/assets/images/chart/charts/bar_x.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const barCommonConfig: ConfigType = {
  key: 'BarCommon',
  title: '基础',
  category: ChatCategoryEnum.BAR,
  node: barCommon,
  image: image
}
