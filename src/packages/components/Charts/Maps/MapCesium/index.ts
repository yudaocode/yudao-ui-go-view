import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MapCesiumConfig: ConfigType = {
  key: 'MapCesium',
  chartKey: 'VMapCesium',
  conKey: 'VCMapCesium',
  title: 'CesiumGIS地图',
  category: ChatCategoryEnum.MAP,
  categoryName: ChatCategoryEnumName.MAP,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'map_cesium.png'
}
