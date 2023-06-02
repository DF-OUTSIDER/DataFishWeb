/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\api\login\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
import request from '@/config/axios'
import type { UserType } from '@/modules/system/user/api/types'
import { Oauth2TokenType } from '../common/type'

// login
export const loginApi = (data: Oauth2TokenType): Promise<IResponse<Oauth2TokenType>> => {
  return request.post({ url: '/auth/login', data })
}

export const loginOutApi = (): Promise<IResponse> => {
  return request.get({ url: '/auth/loginOut' })
}
