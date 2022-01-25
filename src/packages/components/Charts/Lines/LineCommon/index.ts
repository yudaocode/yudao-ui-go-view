import LineCommon from './index.vue'
import image from '@/assets/images/chart/charts/line.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const LineCommonConfig: ConfigType = {
  key: 'VLineCommon',
  title: '折线图',
  category: ChatCategoryEnum.LINE,
  categoryName: ChatCategoryEnumName.LINE,
  package: PackagesCategoryEnum.CHARTS,
  node: LineCommon,
  image: image
}
