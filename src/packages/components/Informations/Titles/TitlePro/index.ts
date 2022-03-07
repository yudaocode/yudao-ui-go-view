import TitlePro from './index.vue'
import Configuration from './config.vue'
import image from '@/assets/images/chart/informations/title_main.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TitleProConfig: ConfigType = {
  key: 'VTitlePro',
  conKey: 'VCTitlePro',
  title: '中心标题',
  category: ChatCategoryEnum.TITLE,
  categoryName: ChatCategoryEnumName.TITLE,
  package: PackagesCategoryEnum.INFORMATION,
  node: () => TitlePro,
  conNode: () => Configuration,
  image
}
