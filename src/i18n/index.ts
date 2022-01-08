//语言
import { lang } from '@/settings/designSetting'
import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import { getLocalStorage } from '@/utils'
import { StorageEnum }from '@/enums/storageEnum'
import { LangStateType } from '@/store/modules/langStore/langStore.d'
import zh from './zh/index'
import en from './en/index'

const langStorage: LangStateType = getLocalStorage(StorageEnum.GO_LANG_STORE)

const i18n = createI18n({
  locale: langStorage.lang || lang,
  globalInjection: true,
  messages: {
    zh: zh,
    en: en
  }
})

export default i18n
