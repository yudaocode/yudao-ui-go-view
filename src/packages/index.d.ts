import { Component } from '@/router/types'

// 组件配置
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

// 组件实例类
export interface CreateComponentType {
  id: string
  key: string
  attr: { x: number; y: number; w: number; h: number }
  chartData: ConfigType
  option: object
  setPosition: Function
}

// 包分类枚举
export enum PackagesCategoryEnum {
  CHARTS = 'Charts',
  TABLES = 'Tables',
  INFORMATION = 'Informations',
  DECORATES = 'Decorates'
}

// 包分类名称
export enum PackagesCategoryName {
  CHARTS = '图表',
  TABLES = '表格',
  INFORMATION = '信息',
  DECORATES = '小组件'
}

// 图表包类型
export type PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ConfigType[]
  [PackagesCategoryEnum.INFORMATION]: ConfigType[]
  [PackagesCategoryEnum.TABLES]: ConfigType[]
  [PackagesCategoryEnum.DECORATES]: ConfigType[]
}
