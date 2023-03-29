/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-29
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\api\log\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved.
 */
import request from '@/config/axios'

export const getLoggerListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/logger/list', params })
}

export const deleteLoggerListApi = (ids: string[]): Promise<IResponse> => {
  return request.post({ url: '/logger/delete', data: { ids } })
}

export const getLoggerDetailApi = (id: string): Promise<IResponse> => {
  return request.get({ url: '/logger/detail', params: { id } })
}
