/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\hooks\web\jwtToken.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
import { Oauth2TokenType } from '@/api/common/type'
import { useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

const AccessTokenKey = 'DF_ACCESS_TOKEN'
const RefreshTokenKey = 'DF_REFRESH_TOKEN'

export const getAccessToken = () => {
  const token = wsCache.get(AccessTokenKey)
  console.log(token)
  return token
}

/** @deprecated */
export const setAccessToken = (token: string, remember: boolean) => {
  if (remember) {
    wsCache.set(AccessTokenKey, token)
  }
}

export const setToken = (oauth2Token: Oauth2TokenType, remember: boolean) => {
  if (remember) {
    // wsCache.set(RefreshTokenKey, oauth2Token.refreshToken, { exp: oauth2Token.expiresTime })
    wsCache.set(RefreshTokenKey, oauth2Token.refreshToken)
    wsCache.set(AccessTokenKey, oauth2Token.accessToken)
  }
}

export const removeAccessToken = () => {
  wsCache.delete(AccessTokenKey)
}

// 删除token
export const removeToken = () => {
  wsCache.delete(AccessTokenKey)
  wsCache.delete(RefreshTokenKey)
}
