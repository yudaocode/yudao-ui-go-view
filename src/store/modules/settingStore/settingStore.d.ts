export enum SettingStoreEnums {
   HIDE_PACKAGE_ONE_CATEGORY = 'hidePackageOneCategory',
}

export interface SettingStoreType {
  [SettingStoreEnums.HIDE_PACKAGE_ONE_CATEGORY]: boolean
}
