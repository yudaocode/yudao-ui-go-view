export interface LoginResult {
  token: {
    /**
     * token 值
     */
    tokenValue: string
    /**
     * token key
     */
    tokenName: string
  }
  userinfo: {
    /**
     * 昵称
     */
    nickname: string
    /**
     * 用户名
     */
    username: string
    /**
     * 用户 id
     */
    id: string
  }
}

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
