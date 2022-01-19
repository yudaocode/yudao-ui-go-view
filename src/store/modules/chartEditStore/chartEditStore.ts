import { defineStore } from 'pinia'
import { chartEditStoreType } from './chartEditStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'

export const useChartEditStoreStore = defineStore({
  id: 'useChartEditStoreStore',
  state: (): chartEditStoreType => ({}),
  getters: {},
  actions: {}
})