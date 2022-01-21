import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
const chartEditStore = useChartEditStoreStore()

export const getChartEditStore = () => {
  return chartEditStore
}
export const getChartEditStoreEnum = () => {
  return EditCanvasTypeEnum
}
