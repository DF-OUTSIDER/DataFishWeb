/*
 * @Author: outsider
 * @Date: 2023-06-08
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */
import request from '@/config/axios'
import { StorageConfigType } from './types'

export const getStorageConfigListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/storageConfig/list', params })
}

export const deleteStorageConfigListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/storageConfig/delete', data: { ids } })
}

export const saveStorageConfigApi = (
  data: StorageConfigType
): Promise<IResponse<StorageConfigType>> => {
  return request.post({ url: '/storageConfig/save', data })
}

export const getStorageConfigDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/storageConfig/detail', params: { id } })
}
