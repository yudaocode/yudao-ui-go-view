//语言
import { lang } from '@/settings/designSetting'
import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import { getLocalStorage } from '@/utils'
import { GO_LANG_SELECT } from '@/settings/storageConst'
import zh from './zh/index'
import en from './en/index'

const lang_storage = getLocalStorage(GO_LANG_SELECT)

const i18n = createI18n({
  locale: lang_storage || lang,
  globalInjection: true,
  messages: {
    zh: zh,
    en: en
  }
})

export default i18n
