import { defineStore } from 'pinia'
import { PackagesStoreType, PackagesType } from './packagesStore.d'
import { packagesList } from '@/packages/index'

export const usePackagesStore = defineStore({
  id: 'usePackagesStore',
  state: (): PackagesStoreType => ({
    packagesList
  }),
  getters: {
    getPackagesList(): PackagesType {
      return this.packagesList
    }
  }
})
