import { defineStore } from 'pinia'
import { lang } from '@/settings/designSetting'
import { LangStateType } from './langStore.d'
import { LangEnum } from '@/enums/styleEnum'
import i18n from '@/i18n/index'
import { setLocalStorage, getLocalStorage, reloadRoutePage } from '@/utils'
import { GO_LANG } from '@/settings/storageConst'

const storageLang: LangStateType = getLocalStorage(GO_LANG)

export const useLangStore = defineStore({
  id: 'useLangStore',
  state: (): LangStateType =>
    storageLang || {
      lang,
      // 默认刷新页面
      isReload: true
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
      setLocalStorage(GO_LANG, this.$state)
    },
    changeLang(lang: LangEnum): void {
      if (this.lang === lang) return
      this.lang = lang
      i18n.global.locale = lang

      setLocalStorage(GO_LANG, this.$state)

      if (this.getReload) {
        reloadRoutePage()
      }
    }
  }
})
