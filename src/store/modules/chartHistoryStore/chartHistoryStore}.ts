import { defineStore } from 'pinia'
import {
  HistoryStackEnum,
  HistoryItemType,
  ChartHistoryStoreType
} from './chartHistoryStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'

export const useChartHistoryStoreStore = defineStore({
  id: 'useChartHistoryStore',
  state: (): ChartHistoryStoreType => ({
    // 后退栈（记录栈）
    backStack: [],
    // 前进栈
    forwardStack: []
  }),
  getters: {
    getBackStack(): Array<HistoryItemType> {
      return this.backStack
    },
    getForwardStack(): Array<HistoryItemType> {
      return this.forwardStack
    }
  },
  actions: {
    // * 推入记录栈
    addBackStackItem(item: HistoryItemType | Array<HistoryItemType>): void {
      if(item instanceof Array) this.backStack = [...this.backStack, ...item]
      else this.backStack.push(item)
    },
    // * 推入前进栈
    addForwardStack(item: HistoryItemType | Array<HistoryItemType>): void {
      if(item instanceof Array) this.forwardStack = [...this.forwardStack, ...item]
      else this.forwardStack.push(item)
    },
    // * 移出记录栈
    popBackStackItem(
      index?: number
    ): HistoryItemType[] | HistoryItemType | undefined {
      const length = this.backStack.length
      if (index && length >= index) {
        return this.backStack.splice(-index)
      }
      if (this.backStack.length > 0) {
        return this.backStack.pop()
      }
    },
    // * 移出前进栈
    popForwardStack(
      index?: number
    ): HistoryItemType[] | HistoryItemType | undefined {
      const length = this.forwardStack.length
      if (index && length >= index) {
        return this.forwardStack.splice(-index)
      }
      if (this.forwardStack.length > 0) {
        return this.forwardStack.pop()
      }
    }
  }
})
