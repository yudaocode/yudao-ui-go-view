import { defineStore } from 'pinia';
import { store } from '@/store';
import designSetting from '@/settings/designSetting';
const { darkTheme, appTheme, appThemeList } = designSetting;
import { DesignStateType } from './designStore.d'

export const useDesignStore = defineStore({
  id: 'useDesignStore',
  state: (): DesignStateType => ({
    darkTheme,
    appTheme,
    appThemeList,
  }),
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme;
    },
    getAppTheme(): string {
      return this.appTheme;
    },
    getAppThemeList(): string[] {
      return this.appThemeList;
    },
  },
});

export function useDesignSettingWithOut() {
  return useDesignStore(store);
}
