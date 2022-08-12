import { getUUID } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { ChartEditStoreEnum, ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
import { fetchChartComponent, fetchConfigComponent, createComponent } from '@/packages/index'
import { CreateComponentType, CreateComponentGroupType, ConfigType } from '@/packages/index.d'
import { PublicGroupConfigClass } from '@/packages/public/publicConfig'

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
      const intComponent = (target: CreateComponentType) => {
        if (!window['$vue'].component(target.chartConfig.chartKey)) {
          window['$vue'].component(target.chartConfig.chartKey, fetchChartComponent(target.chartConfig))
          window['$vue'].component(target.chartConfig.conKey, fetchConfigComponent(target.chartConfig))
        }
      }

      if (e.isGroup) {
        ;(e as CreateComponentGroupType).groupList.forEach(groupItem => {
          intComponent(groupItem)
        })
      } else {
        intComponent(e as CreateComponentType)
      }
    })
    // 数据赋值
    for (const key in projectData) {
      // 组件
      if (key === ChartEditStoreEnum.COMPONENT_LIST) {
        for (const comItem of projectData[key]) {

          // 重新创建是为了处理类种方法消失的问题
          const create = async (e: CreateComponentType, callBack?: (e: CreateComponentType) => void) => {
            // 补充 class 上的方法
            let newComponent: CreateComponentType = await createComponent(e.chartConfig as ConfigType)
            if (callBack) {
              callBack(Object.assign(newComponent, { ...e, id: getUUID() }))
            } else {
              chartEditStore.addComponentList(Object.assign(newComponent, { ...e, id: getUUID() }), false, true)
            }
          }

          if (comItem.isGroup) {
            // 创建分组
            let groupClass = new PublicGroupConfigClass()
            groupClass = Object.assign(groupClass, comItem)

            // 注册子应用
            const targetList: CreateComponentType[] = []
            ;(comItem as CreateComponentGroupType).groupList.forEach(groupItem => {
              create(groupItem, e => {
                targetList.push(e)
              })
            })
            groupClass.groupList = targetList
            
            // 分组插入到列表
            chartEditStore.addComponentList(groupClass, false, true)
          } else {
            create(comItem as CreateComponentType)
          }
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
