/*
 * @Author: outsider
 * @Date: 2023-06-16
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */
import request from '@/config/axios'
import { GoViewProjectType } from './types'

export const getGoViewProjectListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/goViewProject/list', params })
}

export const deleteGoViewProjectListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/goViewProject/delete', data: { ids } })
}

export const saveGoViewProjectApi = (
  data: GoViewProjectType
): Promise<IResponse<GoViewProjectType>> => {
  return request.post({ url: '/goViewProject/save', data })
}

export const getGoViewProjectDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/goViewProject/detail', params: { id } })
}
