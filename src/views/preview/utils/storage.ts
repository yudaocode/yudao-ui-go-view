import { getSessionStorage, fetchRouteParamsLocation, httpErrorHandle, JSONParse } from '@/utils'
import { ResultEnum } from '@/enums/httpEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { fetchProjectApi } from '@/api/path'

const chartEditStore = useChartEditStore()

export interface ChartEditStorageType extends ChartEditStorage {
  id: string
}

// 根据路由 id 获取存储数据的信息
export const getSessionStorageInfo = async () => {
  const id = fetchRouteParamsLocation()
  const storageList: ChartEditStorageType[] = getSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST)
  console.log(storageList)
  // 是否本地预览
  if (!storageList || storageList.findIndex(e => e.id === id.toString()) === -1) {
    console.log("否本地预览")
    // 接口调用
    const res = await fetchProjectApi({ id: id })
    if (res && res.code === ResultEnum.SUCCESS) {
      const { content, status } = res.data
      if (status === 1) {
        // 跳转未发布页
        return { isRelease: false }
      }
      const chartEitStorageType = content as unknown as ChartEditStorageType
      console.log(chartEitStorageType)
      chartEditStore.editCanvasConfig = chartEitStorageType.editCanvasConfig
      chartEditStore.requestGlobalConfig = chartEitStorageType.requestGlobalConfig
      chartEditStore.componentList = chartEitStorageType.componentList
      return { ...JSONParse(content), id }
    } else {
      httpErrorHandle()
    }
  } else {
    console.log("是本地预览")

    // 本地读取
    for (let i = 0; i < storageList.length; i++) {
      if (id.toString() === storageList[i]['id']) {
        const { editCanvasConfig, requestGlobalConfig, componentList } = storageList[i]
        chartEditStore.editCanvasConfig = editCanvasConfig
        chartEditStore.requestGlobalConfig = requestGlobalConfig
        chartEditStore.componentList = componentList
        return storageList[i]
      }
    }
  }
}
