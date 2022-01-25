import Variable from './index.vue'
import image from '@/assets/images/chart/charts/water_variable.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VariableConfig: ConfigType = {
  key: 'VVariable',
  title: '折线面积图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  node: Variable,
  image: image
}
