import image from '@/assets/images/chart/charts/Point.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const ScatterCommonConfig: ConfigType = {
  key: 'Scatter',
  chartKey: 'VScatter',
  conKey: 'VCScatter',
  title: '散点图',
  category: ChatCategoryEnum.SCATTER,
  categoryName: ChatCategoryEnumName.SCATTER,
  package: PackagesCategoryEnum.CHARTS,
  image
}
