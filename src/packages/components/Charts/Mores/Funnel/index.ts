import Funnel from './index.vue'
import Configuration from './config.vue'
import image from '@/assets/images/chart/charts/funnel.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const FunnelConfig: ConfigType = {
  key: 'VFunnel',
  title: '漏斗图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  node: Funnel,
  conNode: () => Configuration,
  image: image
}
