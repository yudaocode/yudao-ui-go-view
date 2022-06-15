import image from '@/assets/images/chart/informations/text_static.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TextGradientConfig: ConfigType = {
  key: 'TextGradient',
  chartKey: 'VTextGradient',
  conKey: 'VCTextGradient',
  title: '渐变文字',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: PackagesCategoryEnum.INFORMATIONS,
  image
}
