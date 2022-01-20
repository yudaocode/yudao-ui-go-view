import { useChartEditStoreStore } from '@/store/modules/chartEditStore/chartEditStore'
const chartEditStore = useChartEditStoreStore()

export const getChartEditStore = () => {
  return chartEditStore
}
