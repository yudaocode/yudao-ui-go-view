import BarCommon from './index.vue'
import image from '@/assets/images/chart/charts/bar_x.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { chartSize } from './config'

export const BarCommonConfig: ConfigType = {
  key: 'VBarCommon',
  title: '柱状图',
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.CHARTS,
  node: BarCommon,
  image: image,
  chartData: { chartSize }
}
