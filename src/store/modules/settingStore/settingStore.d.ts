export enum SettingStoreEnums {
  HIDE_PACKAGE_ONE_CATEGORY = 'hidePackageOneCategory',
  CHANGE_LANG_RELOAD = 'changeLangReload',
  ASIDE_ALL_COLLAPSED = 'asideAllCollapsed',
  CHART_MOVE_DISTANCE = 'chartMoveDistance',
  CHART_ALIGN_RANGE = 'chartAlignRange',
}

export interface SettingStoreType {
  [SettingStoreEnums.HIDE_PACKAGE_ONE_CATEGORY]: boolean
  [SettingStoreEnums.CHANGE_LANG_RELOAD]: boolean
  [SettingStoreEnums.ASIDE_ALL_COLLAPSED]: boolean
  [SettingStoreEnums.CHART_MOVE_DISTANCE]: number
  [SettingStoreEnums.CHART_ALIGN_RANGE]: number
}
