import { PackagesCategoryEnum, PackagesType } from '@/packages/index.d'
import { ChartList } from '@/packages/components/Chart/index'
import { DecorateList } from '@/packages/components/Decorate/index'
import { InformationList } from '@/packages/components/Information/index'
import { TableList } from '@/packages/components/Tables/index'

// 所有图表
let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.INFORMATION]: InformationList,
  [PackagesCategoryEnum.TABLES]: TableList,
  [PackagesCategoryEnum.DECORATES]: DecorateList,
}

export { packagesList }
