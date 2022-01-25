import TextCloud from './index.vue'
import image from '@/assets/images/chart/informations/words_cloud.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TextCloudConfig: ConfigType = {
  key: 'VTextCloud',
  title: '词云',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATION,
  node: TextCloud,
  image
}
