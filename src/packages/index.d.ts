import { Component } from '@/router/types'

// import { ConfigType } from '@/packages/index.d'
export type ConfigType = {
  key: string
  title: string
  node: Component
  image: string
  [T: string]: unknown
}

export type PackagesType = {
  Charts: ConfigType[]
}
