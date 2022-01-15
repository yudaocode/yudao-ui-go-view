import { defineStore } from 'pinia'
import { lang } from '@/settings/designSetting'
import { LangStateType } from './langStore.d'
import { LangEnum } from '@/enums/styleEnum'
import i18n from '@/i18n/index'
import { setLocalStorage, getLocalStorage, reloadRoutePage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'

const { GO_LANG_STORE } = StorageEnum

const storageLang: LangStateType = getLocalStorage(GO_LANG_STORE)

// 语言
export const useLangStore = defineStore({
  id: 'useLangStore',
  state: (): LangStateType =>
    storageLang || {
      lang,
      isReload: false
    },
  getters: {
    getLang(): LangEnum {
      return this.lang
    },
    getReload(): boolean {
      return this.isReload
    }
  },
  actions: {
    changeReload(value: boolean): void {
      this.isReload = value
      setLocalStorage(GO_LANG_STORE, this.$state)
    },
    changeLang(lang: LangEnum): void {
      if (this.lang === lang) return
      this.lang = lang
      i18n.global.locale = lang

      setLocalStorage(GO_LANG_STORE, this.$state)

      if (this.getReload) {
        reloadRoutePage()
      }
    }
  }
})
