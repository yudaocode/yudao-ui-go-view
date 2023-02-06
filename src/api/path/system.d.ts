export interface AuthLoginRespVO {
  /**
   * 用户编号
   */
  userId: number
  /**
   * 访问令牌
   */
  accessToken: string
  /**
   * 刷新令牌
   */
  refreshToken: string
  /**
   * 过期时间
   */
  expiresTime: number
}

export interface ProfileVO {
  id: number
  nickname: string
}
