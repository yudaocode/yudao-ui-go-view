import Funnel from './index.vue'
import image from '@/assets/images/chart/charts/funnel.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../../index.d'

export const FunnelConfig: ConfigType = {
  key: 'Funnel',
  title: '漏斗图',
  category: ChatCategoryEnum.MORE,
  node: Funnel,
  image: image
}
