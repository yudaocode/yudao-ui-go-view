import TitlePro from './index.vue'
import image from '@/assets/images/chart/informations/title_main.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const TitleProConfig: ConfigType = {
  key: 'TitlePro',
  title: '中心标题',
  category: ChatCategoryEnum.TITLE,
  node: TitlePro,
  image
}
