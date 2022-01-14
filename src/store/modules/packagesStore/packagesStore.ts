import { defineStore } from 'pinia'
import { PackagesStoreType, ConfigType } from './packagesStore.d'
import { packagesList } from '@/packages/index'

export const usePackagesStore = defineStore({
  id: 'usePackagesStore',
  state: (): PackagesStoreType => ({
    packagesList
  }),
  getters: {
    getPackagesList(): ConfigType | {} {
      if (this.packagesList && this.packagesList.charts) {
        return this.packagesList.charts
      }
      return {}
    }
  }
})
