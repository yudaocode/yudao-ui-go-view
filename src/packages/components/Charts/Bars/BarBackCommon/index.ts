import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const BarBackCommonConfig: ConfigType = {
  key: 'BarBackCommon',
  chartKey: 'VBarBackCommon',
  conKey: 'VCBarBackCommon',
  title: '多折线字节版',
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'visactor_line.png'
}
