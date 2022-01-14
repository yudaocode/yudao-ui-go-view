import { PackagesCategoryEnum, PackagesType } from '@/packages/index.d'
import { ChartList } from '@/packages/components/Chart/index'
import { DecorateList } from '@/packages/components/Decorate/index'

// 所有图表
let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.DECORATES]: DecorateList
}

export { packagesList }
