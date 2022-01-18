import TextCommon from './index.vue'
import image from '@/assets/images/chart/informations/text_static.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TextCommonConfig: ConfigType = {
  key: 'VText',
  title: '文字',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  node: TextCommon,
  image
}
