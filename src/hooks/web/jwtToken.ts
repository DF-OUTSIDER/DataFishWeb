/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\hooks\web\jwtToken.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
import { useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

const TokenKey = 'DATA-FISH-TOKEN'

export const getToken = () => {
  const token = wsCache.get(TokenKey)
  console.log(token)
  return token
}

export const setToken = (token: string, remember: boolean) => {
  if (remember) {
    wsCache.set(TokenKey, token)
  }
}

export const removeToken = () => {
  wsCache.delete(TokenKey)
}
