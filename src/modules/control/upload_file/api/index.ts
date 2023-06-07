/*
 * @Author: outsider
 * @Date: 2023-06-07
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */
import request from '@/config/axios'
import { UploadFileType } from './types'

export const getUploadFileListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/uploadFile/list', params })
}

export const deleteUploadFileListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/uploadFile/delete', data: { ids } })
}

export const saveUploadFileApi = (data: UploadFileType): Promise<IResponse<UploadFileType>> => {
  return request.post({ url: '/uploadFile/save', data })
}

export const getUploadFileDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/uploadFile/detail', params: { id } })
}
