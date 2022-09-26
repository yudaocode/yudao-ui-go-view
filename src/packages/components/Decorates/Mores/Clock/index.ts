import image from '@/assets/images/chart/decorates/clock.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const ClockConfig: ConfigType = {
  key: 'Clock',
  chartKey: 'VClock',
  conKey: 'VCClock',
  title: '时钟',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  image
}
