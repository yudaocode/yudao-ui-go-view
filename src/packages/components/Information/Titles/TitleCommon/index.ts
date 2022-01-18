import TitleCommon from './index.vue'
import image from '@/assets/images/chart/informations/title_diamond.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TitleCommonConfig: ConfigType = {
  key: 'VText',
  title: '普通标题',
  category: ChatCategoryEnum.TITLE,
  categoryName: ChatCategoryEnumName.TITLE,
  node: TitleCommon,
  image
}