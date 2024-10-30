import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const GroupedStackedRoseChartCommonConfig: ConfigType = {
  key: 'GroupedStackedRoseChartCommon',
  chartKey: 'VGroupedStackedRoseChartCommon',
  conKey: 'VCGroupedStackedRoseChartCommon',
  title: '分组堆叠玫瑰图字节版',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'grouped_stacked_rose_chart.png'
}
