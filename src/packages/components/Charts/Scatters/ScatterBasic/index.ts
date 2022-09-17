import image from '@/assets/images/chart/charts/point.png'
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const ScatterBasicConfig: ConfigType = {
  key: 'ScatterBasic',
  chartKey: 'VScatterBasic',
  conKey: 'VCScatterBasic',
  title: '基础散点图',
  category: ChatCategoryEnum.SCATTER,
  categoryName: ChatCategoryEnumName.SCATTER,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image
}
