import BorderCommon from './index.vue'
import image from '@/assets/images/chart/decorates/border.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const BorderCommonConfig: ConfigType = {
  key: 'VBorderCommon',
  title: '边框',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  node: BorderCommon,
  image
}
