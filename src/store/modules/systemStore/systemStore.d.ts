export enum SystemStoreUserInfoEnum {
  USER_TOKEN = 'userToken',
  USER_ID = 'userId',
  USER_NAME = 'userName',
  NICK_NAME = 'nickName',
}

export interface UserInfoType {
  [SystemStoreUserInfoEnum.USER_TOKEN]?: string,
  [SystemStoreUserInfoEnum.USER_ID]?: string,
  [SystemStoreUserInfoEnum.USER_NAME]?: string,
  [SystemStoreUserInfoEnum.NICK_NAME]?: string,
}

export enum SystemStoreEnum {
  USER_INFO = 'userInfo'
}

export interface SystemStoreType {
  [SystemStoreEnum.USER_INFO]: UserInfoType
}