import { Component } from '@/router/types'

// import { ConfigType } from '@/packages/index.d'
export type ConfigType = {
  key: string
  title: string
  category: string
  node: Component
  image: string
  [T: string]: unknown
}


export enum PackagesCategoryEnum {
  CHARTS = 'CHARTS',
  TABLES = 'TABLES',
  TEXTS = 'TEXTS',
  DECORATES = 'DECORATES'
}

export type PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ConfigType[]
  [PackagesCategoryEnum.TEXTS]: ConfigType[]
  [PackagesCategoryEnum.TABLES]: ConfigType[]
  [PackagesCategoryEnum.DECORATES]: ConfigType[]
}