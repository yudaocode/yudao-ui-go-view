import type { App } from 'vue'
import {
  PackagesCategoryEnum,
  PackagesType,
  ConfigType
} from '@/packages/index.d'
import { ChartList } from '@/packages/components/Chart/index'
import { DecorateList } from '@/packages/components/Decorate/index'
import { InformationList } from '@/packages/components/Information/index'
import { TableList } from '@/packages/components/Table/index'

// 所有图表
let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.INFORMATION]: InformationList,
  [PackagesCategoryEnum.TABLES]: TableList,
  [PackagesCategoryEnum.DECORATES]: DecorateList
}

// 注册
const packagesInstall = (app: App): void => {
  for (const item in packagesList) {
    const chartList: ConfigType[] = (packagesList as any)[item]
    chartList.forEach((chart: ConfigType) => {
      app.component(chart.key, chart.node)
    })
  }
}

export { packagesList, packagesInstall }
