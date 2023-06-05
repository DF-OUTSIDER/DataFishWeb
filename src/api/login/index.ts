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

// 登录
export const loginApi = (data: UserType): Promise<IResponse<Oauth2TokenType>> => {
  return request.post({ url: '/auth/login', data })
}

// 登出
export const loginOutApi = (): Promise<IResponse> => {
  return request.get({ url: '/auth/loginOut' })
}

// 获取当前用户信息及权限
export const getCurrentUserApi = () => {
  return request.get({ url: '/auth/getCurrentUser' })
}
