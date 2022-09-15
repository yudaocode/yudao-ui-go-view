import image from '@/assets/images/chart/charts/point.png'
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const ScatterMuitDataConfig: ConfigType = {
  key: 'ScatterMuitData',
  chartKey: 'VScatterMuitData',
  conKey: 'VCScatterMuitData',
  title: '多数据散点图',
  category: ChatCategoryEnum.SCATTER,
  categoryName: ChatCategoryEnumName.SCATTER,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image
}
