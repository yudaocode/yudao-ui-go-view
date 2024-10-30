import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TextCardConfig: ConfigType = {
  key: 'TextCard',
  chartKey: 'VTextCard',
  conKey: 'VCTextCard',
  title: '文本卡片',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: PackagesCategoryEnum.INFORMATIONS,
  image: 'text_card.png'
}
