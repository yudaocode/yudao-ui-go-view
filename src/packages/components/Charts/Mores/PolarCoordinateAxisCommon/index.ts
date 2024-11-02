import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PolarCoordinateAxisCommonConfig: ConfigType = {
  key: 'PolarCoordinateAxisCommon',
  chartKey: 'VPolarCoordinateAxisCommon',
  conKey: 'VCPolarCoordinateAxisCommon',
  title: '极坐标轴图字节版',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'polar_coordinate_axis.png'
}
