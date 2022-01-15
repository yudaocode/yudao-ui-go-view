export enum SettingStoreEnums {
  HIDE_PACKAGE_ONE_CATEGORY = 'hidePackageOneCategory',
  CHANGE_LANG_RELOAD = 'changeLangReload',
  ASIDE_ALL_COLLAPSED = 'asideAllCollapsed',
}

export interface SettingStoreType {
  [SettingStoreEnums.HIDE_PACKAGE_ONE_CATEGORY]: boolean
  [SettingStoreEnums.CHANGE_LANG_RELOAD]: boolean
  [SettingStoreEnums.ASIDE_ALL_COLLAPSED]: boolean
}
