import TitleCommon from './index.vue'
import image from '@/assets/images/chart/informations/title_diamond.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const TitleCommonConfig: ConfigType = {
  key: 'VText',
  title: '普通标题',
  category: ChatCategoryEnum.TITLE,
  node: TitleCommon,
  image
}