import { defineStore } from 'pinia'
import { store } from '@/store'
import { theme } from '@/settings/designSetting'
import { DesignStateType } from './designStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils/index'
import { GO_Theme_SELECT } from '@/settings/storageConst'
import { ThemeEnum } from '@/enums/styleEnum'

const { darkTheme, appTheme, appThemeList } = theme
const storageThemeName = getLocalStorage(GO_Theme_SELECT)

export const useDesignStore = defineStore({
  id: 'useDesignStore',
  state: (): DesignStateType => ({
    // 是否暗黑
    darkTheme: storageThemeName === ThemeEnum.dark,
    // 主题名称
    themeName:
      storageThemeName || (darkTheme && ThemeEnum.dark) || ThemeEnum.light,
    // 颜色色号
    appTheme,
    // 颜色列表
    appThemeList
  }),
  getters: {
    getDarkTheme(e): boolean {
      return this.darkTheme
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppThemeList(): string[] {
      return this.appThemeList
    }
  },
  actions: {
    changeTheme(): void {
      this.darkTheme = !this.darkTheme
      this.themeName = this.darkTheme ? ThemeEnum.dark : ThemeEnum.light
      setLocalStorage(GO_Theme_SELECT, this.themeName)
    }
  }
})

export function useDesignSettingWithOut() {
  return useDesignStore(store)
}
