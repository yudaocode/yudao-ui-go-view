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
}

// 组件实例类
export interface PublicConfigType {
  id: string
  rename?: string
  attr: { x: number; y: number; w: number; h: number; zIndex: number }
  setPosition: Function
}
export interface CreateComponentType extends PublicConfigType {
  key: string
  chartConfig: Omit<ConfigType, 'node'>
  option: object
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
