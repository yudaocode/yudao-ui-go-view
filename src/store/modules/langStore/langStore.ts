import { defineStore } from 'pinia'
import { lang } from '@/settings/designSetting'
import { LangStateType } from './langStore.d'
import { LangEnum } from '@/enums/styleEnum'
import i18n from '@/i18n/index'
import { setLocalStorage, reloadRoutePage } from '@/utils'
import { GO_LANG_SELECT } from '@/settings/storageConst'

export const useLangStore = defineStore({
  id: 'useLangStore',
  state: (): LangStateType => ({
    lang
  }),
  getters: {
    getLang(): LangEnum {
      return this.lang
    }
  },
  actions: {
    changeLang(lang: LangEnum): void {
      this.lang = lang
      i18n.global.locale = lang
      setLocalStorage(GO_LANG_SELECT, lang)
      reloadRoutePage()
    }
  }
})
