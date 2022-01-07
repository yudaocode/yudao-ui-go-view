import { LangEnum } from '@/enums/styleEnum'
export interface LangStateType {
  // 当前语言
  lang: LangEnum,
  // 是否刷新
  isReload: boolean
}
