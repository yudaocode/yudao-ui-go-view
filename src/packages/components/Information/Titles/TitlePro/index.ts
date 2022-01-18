import TitlePro from './index.vue'
import image from '@/assets/images/chart/informations/title_main.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TitleProConfig: ConfigType = {
  key: 'VTitlePro',
  title: '中心标题',
  category: ChatCategoryEnum.TITLE,
  categoryName: ChatCategoryEnumName.TITLE,
  node: TitlePro,
  image
}
