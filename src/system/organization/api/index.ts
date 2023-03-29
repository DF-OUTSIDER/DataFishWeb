/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-13
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\system\organization\api\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved.
 */
import request from '@/config/axios'
import { organizationType } from './types'

// Organization
export const getOrganizationDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/organization/detail', params: { id } })
}

export const saveOrganizationApi = (
  data: organizationType
): Promise<IResponse<organizationType>> => {
  return request.post({ url: '/organization/save', data })
}

export const getOrganizationListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/organization/list', params })
}

export const deleteOrganizationListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/organization/delete', data: { ids } })
}

export const getOrganizationCascaderApi = (): Promise<IResponse> => {
  return request.get({ url: '/organization/getOrganizationCascader' })
}

export const getOrganizationTreeApi = (organizationId: number): Promise<IResponse> => {
  return request.get({ url: '/organization/getOrganizationTree', params: { organizationId } })
}
