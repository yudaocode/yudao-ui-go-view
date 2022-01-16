import TableCategory from './index.vue'
import image from '@/assets/images/chart/Tables/tables_categary.png'
import { ConfigType } from '@/packages/index.d'
import { ChatCategoryEnum } from '../index.d'

export const TableCategoryConfig: ConfigType = {
  key: 'VTableCategory',
  title: '归类表格',
  category: ChatCategoryEnum.table,
  node: TableCategory,
  image
}
