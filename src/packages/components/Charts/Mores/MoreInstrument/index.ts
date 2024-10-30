import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MoreInstrumentConfig: ConfigType = {
  key: 'MoreInstrument',
  chartKey: 'VMoreInstrument',
  conKey: 'VCMoreInstrument',
  title: '底纹仪表图字节版',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'visactor_instrument.png'
}
