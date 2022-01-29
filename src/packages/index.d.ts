import { Component } from '@/router/types'

// import { ConfigType } from '@/packages/index.d'
export type ConfigType = {
  key: string
  title: string
  category: string
  categoryName: string
  package: string
  node: Component
  image: string | (() => Promise<typeof import('*.png')>)
  [T: string]: unknown
}

export enum PackagesCategoryEnum {
  CHARTS = 'Charts',
  TABLES = 'Tables',
  INFORMATION = 'Informations',
  DECORATES = 'Decorates'
}

export enum PackagesCategoryName {
  CHARTS = '图表',
  TABLES = '表格',
  INFORMATION = '信息',
  DECORATES = '小组件'
}

export type PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ConfigType[]
  [PackagesCategoryEnum.INFORMATION]: ConfigType[]
  [PackagesCategoryEnum.TABLES]: ConfigType[]
  [PackagesCategoryEnum.DECORATES]: ConfigType[]
}
