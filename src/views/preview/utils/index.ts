import { getLocalStorage, fetchRouteParams } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'

export interface ChartEditStorageType extends ChartEditStorage {
  id: string
}

export const getLocalStorageInfo: () => ChartEditStorageType | undefined = () => {
  const routeParamsRes = fetchRouteParams()
  if (!routeParamsRes) return
  const { id } = routeParamsRes

  const storageList: ChartEditStorageType[] = getLocalStorage(
    StorageEnum.GO_CHART_STORAGE_LIST
  )

  for (let i = 0; i < storageList.length; i++) {
    if (id.toString() === storageList[i]['id']) {
      return storageList[i]
    }
  }
}
