import Funnel from './index.vue'
import image from '@/assets/images/chart/charts/funnel.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const FunnelConfig: ConfigType = {
  key: 'VFunnel',
  title: '漏斗图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  node: Funnel,
  image: image
}
