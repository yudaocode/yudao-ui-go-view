import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const BiaxLineCommonConfig: ConfigType = {
  key: 'BiaxLineCommon',
  chartKey: 'VBiaxLineCommon',
  conKey: 'VCBiaxLineCommon',
  title: '双轴折线字节版',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'visactor_biax_line.png'
}
