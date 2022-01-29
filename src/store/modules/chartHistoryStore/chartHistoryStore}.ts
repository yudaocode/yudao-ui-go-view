import { defineStore } from 'pinia'
import { chartHistoryStoreType } from './chartHistoryStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'

export const useChartHistoryStoreStore = defineStore({
  id: 'useChartHistoryStore',
  state: (): chartHistoryStoreType => ({}),
  getters: {},
  actions: {}
})