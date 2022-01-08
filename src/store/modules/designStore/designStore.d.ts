import { ThemeEnum } from '@/enums/styleEnum'

export interface DesignStateType {
  // 是否是深色主题
  darkTheme: boolean
  // 主题名称
  themeName: ThemeEnum
  //系统风格
  appTheme: string
  //系统内置风格
  appThemeList: string[]
  // 侧边栏是否全收缩
  asideAllCollapsed: boolean
}
