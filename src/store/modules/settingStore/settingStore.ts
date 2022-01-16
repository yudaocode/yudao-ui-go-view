import { defineStore } from 'pinia'
import {
  hidePackageOneCategory,
  changeLangReload,
  asideAllCollapsed
} from '@/settings/systemSetting'
import { asideCollapsedWidth } from '@/settings/designSetting'
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
      changeLangReload,
      asideAllCollapsed
    },
  getters: {
    getHidePackageOneCategory(): boolean {
      return this.hidePackageOneCategory
    },
    getChangeLangReload(): boolean {
      return this.changeLangReload
    },
    getAsideAllCollapsed(): boolean {
      return this.asideAllCollapsed
    },
    getAsideCollapsedWidth(): number {
      return this.asideAllCollapsed ? 0 : asideCollapsedWidth
    }
  },
  actions: {
    setItem(key: string, value: boolean): void {
      ; (this as any)[key] = value
      setLocalStorage(GO_SYSTEM_SETTING, this.$state)
    },
  },
})
