import TableCategory from './index.vue'
import Configuration from './config.vue'
import image from '@/assets/images/chart/Tables/tables_categary.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TableCategoryConfig: ConfigType = {
  key: 'VTableCategory',
  title: '归类表格',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: PackagesCategoryEnum.TABLES,
  node: TableCategory,
  conNode: () => Configuration,
  image
}
