/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-03-15
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\control\dbcolumn\api\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '@/config/axios'
import { DbColumnType } from './types'

export const getDbColumnListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/dbColumn/list', params })
}

export const saveDbColumnListApi = (dbColumnVos: DbColumnType[]): Promise<IResponse> => {
  return request.post({ url: '/dbColumn/saveList', data: { dbColumnVos } })
}
