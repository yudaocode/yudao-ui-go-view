import image from '@/assets/images/chart/decorates/border_first.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const BorderFirstConfig: ConfigType = {
  key: 'BorderFirst',
  chartKey: 'VBorderFirst',
  conKey: 'VCBorderFirst',
  title: '边框-01',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  image
}
