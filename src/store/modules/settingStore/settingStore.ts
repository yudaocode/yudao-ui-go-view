import { defineStore } from 'pinia'
import { hidePackageOneCategory } from '@/settings/systemSetting'
import { SettingStoreType } from './settingStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
const { GO_SYSTEM_SETTING } = StorageEnum

const storageSetting: SettingStoreType = getLocalStorage(GO_SYSTEM_SETTING)

// 全局设置
export const useSettingStore = defineStore({
  id: 'useSettingStore',
  state: (): SettingStoreType =>
    storageSetting || {
      hidePackageOneCategory,
    },
  getters: {
    getHidePackageOneCategory(): boolean {
      return this.hidePackageOneCategory
    },
  },
  actions: {
    setItem(key: string, value: boolean): void {
      ;(this as any)[key] = value
      setLocalStorage(GO_SYSTEM_SETTING, this.$state)
    },
  },
})
