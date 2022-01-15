import Variable from './index.vue'
import image from '@/assets/images/chart/charts/water_variable.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const VariableConfig: ConfigType = {
  key: 'Variable',
  title: '折线面积图',
  category: ChatCategoryEnum.MORE,
  node: Variable,
  image: image
}
