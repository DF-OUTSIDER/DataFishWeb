/*
 * @Author: outsider
 * @Date: 2023-06-19
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */
import request from '@/config/axios'
import { DbSourceType } from './types'

export const getDbSourceListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/dbSource/list', params })
}

export const deleteDbSourceListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/dbSource/delete', data: { ids } })
}

export const saveDbSourceApi = (data: DbSourceType): Promise<IResponse<DbSourceType>> => {
  return request.post({ url: '/dbSource/save', data })
}

export const getDbSourceDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/dbSource/detail', params: { id } })
}
