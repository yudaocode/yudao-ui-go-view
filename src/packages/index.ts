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
let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.INFORMATION]: InformationList,
  [PackagesCategoryEnum.TABLES]: TableList,
  [PackagesCategoryEnum.DECORATES]: DecorateList
}

// * 注册
const packagesInstall = (app: App): void => {
  for (const item in packagesList) {
    const chartList: ConfigType[] = (packagesList as any)[item]
    chartList.forEach((chart: ConfigType) => {
      app.component(chart.key, chart.node)
    })
  }
}

/**
 * * 获取目标拖拽组件信息
 * @param dropData
 */
const createComponent = async (dropData: ConfigType) => {
  const { category } = dropData
  const key = dropData.key.substring(1)
  const chart = await import(`./components/${dropData.package}/${category}/${key}/config.ts`)
  return new chart.default()
}

export { packagesList, packagesInstall, createComponent }
