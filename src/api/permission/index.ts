/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-29
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\api\permission\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
import request from '@/config/axios'

export const getAuthorityListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/authority/list', params })
}

export const saveAuthorityApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/authority/save', data: params })
}

export const deleteAuthorityListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/authority/delete', data: { ids } })
}
