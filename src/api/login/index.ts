/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\api\login\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
import request from '@/config/axios'
import type { UserType } from '@/system/user/api/types'

// login
export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
  return request.post({ url: '/auth/login', data })
}

export const loginOutApi = (): Promise<IResponse> => {
  return request.get({ url: '/auth/loginOut' })
}
