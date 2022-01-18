import Number from './index.vue'
import image from '@/assets/images/chart/decorates/number.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const NumberConfig: ConfigType = {
  key: 'VNumber',
  title: '数字翻牌',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  node: Number,
  image
}
