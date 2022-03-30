import image from '@/assets/images/chart/decorates/decorates01.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const Decorates01Config: ConfigType = {
  key: 'Decorates01',
  chartKey: 'VDecorates01',
  conKey: 'VCDecorates01',
  title: '装饰组件-01',
  category: ChatCategoryEnum.DECORATES,
  categoryName: ChatCategoryEnumName.DECORATES,
  package: PackagesCategoryEnum.DECORATES,
  image
}
