import { getUUID } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { ChartEditStoreEnum, ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
import { fetchChartComponent, fetchConfigComponent, createComponent } from '@/packages/index'
import { CreateComponentType, CreateComponentGroupType, ConfigType } from '@/packages/index.d'
import { PublicGroupConfigClass } from '@/packages/public/publicConfig'
import merge from 'lodash/merge'

/**
 * 合并处理
 * @param object 模板数据
 * @param sources 新拿到的数据
 * @returns object
 */
const componentMerge = (object: any, sources: any, notComponent = false) => {
  // 非组件不处理
  if (notComponent) return merge(object, sources)
  // 组件排除 options
  const option = sources.option
  if(!option) return merge(object, sources)

  // 为 undefined 的 sources 来源对象属性将被跳过详见 https://www.lodashjs.com/docs/lodash.merge
  sources.option = undefined
  if (option) {
    return {
      ...merge(object, sources),
      option: option
    }
  }
}

// 请求处理
export const useSync = () => {
  const chartEditStore = useChartEditStore()
  const chartHistoryStore = useChartHistoryStore()

  /**
   * * 组件动态注册
   * @param projectData 项目数据
   * @param isReplace 是否替换数据
   * @returns
   */
  const updateComponent = async (projectData: ChartEditStorage, isReplace = false, changeId = false) => {
    if (isReplace) {
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
        (e as CreateComponentGroupType).groupList.forEach(groupItem => {
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
          const create = async (
            _componentInstance: CreateComponentType,
            callBack?: (componentInstance: CreateComponentType) => void
          ) => {
            // 补充 class 上的方法
            let newComponent: CreateComponentType = await createComponent(_componentInstance.chartConfig)
            if (callBack) {
              if (changeId) {
                callBack(componentMerge(newComponent, { ..._componentInstance, id: getUUID() }))
              } else {
                callBack(componentMerge(newComponent, _componentInstance))
              }
            } else {
              if (changeId) {
                chartEditStore.addComponentList(
                  componentMerge(newComponent, { ..._componentInstance, id: getUUID() }),
                  false,
                  true
                )
              } else {
                chartEditStore.addComponentList(componentMerge(newComponent, _componentInstance), false, true)
              }
            }
          }

          if (comItem.isGroup) {
            // 创建分组
            let groupClass = new PublicGroupConfigClass()
            if (changeId) {
              groupClass = componentMerge(groupClass, { ...comItem, id: getUUID() })
            } else {
              groupClass = componentMerge(groupClass, comItem)
            }

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
        componentMerge(chartEditStore[key], projectData[key], true)
      }
    }
  }

  return {
    updateComponent
  }
}
