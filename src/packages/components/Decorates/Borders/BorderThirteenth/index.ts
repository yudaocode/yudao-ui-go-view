import image from '@/assets/images/chart/decorates/border_thirteenth.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const BorderThirteenthConfig: ConfigType = {
  key: 'BorderThirteenth',
  chartKey: 'VBorderThirteenth',
  conKey: 'VCBorderThirteenth',
  title: '边框-13',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  image
}
