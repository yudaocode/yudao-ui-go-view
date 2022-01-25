import Time from './index.vue'
import image from '@/assets/images/chart/decorates/time.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TimeConfig: ConfigType = {
  key: 'VTime',
  title: '时间',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  node: Time,
  image
}
