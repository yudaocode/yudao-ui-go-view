import type { App } from 'vue'
import {
  PackagesCategoryEnum,
  PackagesType,
  ConfigType
} from '@/packages/index.d'
import { ChartList } from '@/packages/components/Charts/index'
import { DecorateList } from '@/packages/components/Decorates/index'
import { InformationList } from '@/packages/components/Informations/index'
import { TableList } from '@/packages/components/Tables/index'

// * 所有图表
export let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.INFORMATION]: InformationList,
  [PackagesCategoryEnum.TABLES]: TableList,
  [PackagesCategoryEnum.DECORATES]: DecorateList
}

export const packgeInstall = (app:App) => {
  ChartList.forEach(e=>{
    console.log(e)
    app.component(e.key, e.node)
  })
}

/**
 * * 获取目标拖拽组件配置信息
 * @param dropData
 */
 export const createComponent = async (dropData: ConfigType) => {
  const { category } = dropData
  const key = dropData.key.substring(1)
  const chart = await import(`./components/${dropData.package}/${category}/${key}/config.ts`)
  return new chart.default()
}

/**
 * * 获取组件信息
 * * import.meta.globEager 不好使，先从原来的位置拿把
 */
 export const fetchChartComponent = (dropData: ConfigType | Omit<ConfigType, "node" | 'conNode'>) => {
  const { key, package:packageName  } = dropData
  return packagesList[packageName as PackagesCategoryEnum].filter(e=> e.key === key)[0].node()
}