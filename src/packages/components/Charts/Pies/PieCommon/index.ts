import PieCommon from './index.vue'
import Configuration from './config.vue'
import image from '@/assets/images/chart/charts/pie.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PieCommonConfig: ConfigType = {
  key: 'VPieCommon',
  conKey: 'VCPieCommon',
  title: '饼图',
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.CHARTS,
  node: () => PieCommon,
  conNode: () => Configuration,
  image
}
