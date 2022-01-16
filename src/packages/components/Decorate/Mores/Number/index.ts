import Number from './index.vue'
import image from '@/assets/images/chart/decorates/number.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const NumberConfig: ConfigType = {
  key: 'VNumber',
  title: '数字翻牌',
  category: ChatCategoryEnum.MORE,
  node: Number,
  image
}
