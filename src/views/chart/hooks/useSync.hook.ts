import { getUUID } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { ChartEditStoreEnum, ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
import { fetchChartComponent, fetchConfigComponent, createComponent } from '@/packages/index'
import { CreateComponentType, CreateComponentGroupType, ConfigType } from '@/packages/index.d'

// 请求处理
export const useSync = () => {
  const chartEditStore = useChartEditStore()
  const chartHistoryStore = useChartHistoryStore()

  /**
   * * 组件动态注册
   * @param projectData 项目数据
   * @param isSplace 是否替换数据
   * @returns 
   */
  const updateComponent = async (projectData: ChartEditStorage, isSplace = false) => {
    if (isSplace) {
      // 清除列表
      chartEditStore.componentList = []
      // 清除历史记录
      chartHistoryStore.clearBackStack()
      chartHistoryStore.clearForwardStack()
    }
    // 列表组件注册
    projectData.componentList.forEach(async (e: CreateComponentType | CreateComponentGroupType) => {
      // 排除分组
      if (e.isGroup) return
      const target = e as CreateComponentType
      if (!window['$vue'].component(target.chartConfig.chartKey)) {
        window['$vue'].component(
          target.chartConfig.chartKey,
          fetchChartComponent(target.chartConfig)
        )
        window['$vue'].component(
          target.chartConfig.conKey,
          fetchConfigComponent(target.chartConfig)
        )
      }
    })
    // 数据赋值
    for (const key in projectData) {
      // 组件
      if (key === ChartEditStoreEnum.COMPONENT_LIST) {
        for (const comItem of projectData[key]) {
          // 补充 class 上的方法
          let newComponent: CreateComponentType = await createComponent(
            comItem.chartConfig as ConfigType
          )
          chartEditStore.addComponentList(
            Object.assign(newComponent, {...comItem, id: getUUID()}),
            false,
            true
          )
        }
      } else {
        // 非组件(顺便排除脏数据)
        if (key !== 'editCanvasConfig' && key !== 'requestGlobalConfig') return
        Object.assign((chartEditStore as any)[key], projectData[key])
      }
    }
  }

  return {
    updateComponent
  }
}