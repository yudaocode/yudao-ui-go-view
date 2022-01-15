import { Component } from '@/router/types'

// import { ConfigType } from '@/packages/index.d'
export type ConfigType = {
  key: string
  title: string
  category: string
  node: Component
  image: string | (() => Promise<typeof import("*.png")>),
  [T: string]: unknown
}


export enum PackagesCategoryEnum {
  CHARTS = 'CHARTS',
  TABLES = 'TABLES',
  INFORMATION = 'INFORMATION',
  DECORATES = 'DECORATES'
}

export type PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ConfigType[]
  [PackagesCategoryEnum.INFORMATION]: ConfigType[]
  [PackagesCategoryEnum.TABLES]: ConfigType[]
  [PackagesCategoryEnum.DECORATES]: ConfigType[]
}