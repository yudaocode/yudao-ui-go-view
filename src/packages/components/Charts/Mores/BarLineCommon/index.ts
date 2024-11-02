import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const BarLineCommonConfig: ConfigType = {
  key: 'BarLineCommon',
  chartKey: 'VBarLineCommon',
  conKey: 'VCBarLineCommon',
  title: '柱状折线字节版',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'visactor_bar_line.png'
}
