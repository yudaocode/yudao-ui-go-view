import TextCommon from './index.vue'
import Configuration from './config.vue'
import image from '@/assets/images/chart/informations/text_static.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TextCommonConfig: ConfigType = {
  key: 'VText',
  conKey: 'VCText',
  title: '文字',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: PackagesCategoryEnum.INFORMATION,
  node: () => TextCommon,
  conNode: () => Configuration,
  image
}
