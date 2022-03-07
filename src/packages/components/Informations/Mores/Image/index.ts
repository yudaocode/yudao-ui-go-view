import Image from './index.vue'
import Configuration from './config.vue'
import image from '@/assets/images/chart/informations/photo.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ImageConfig: ConfigType = {
  key: 'VImage',
  conKey: 'VCImage',
  title: '图片',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATION,
  node: () => Image,
  conNode: () => Configuration,
  image
}
