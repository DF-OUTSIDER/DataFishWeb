/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-27
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\role\api\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
import request from '@/config/axios'
import { PermissionType } from '../../permission/api/types'
import { RoleType } from './types'

// role
export const getRoleDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/role/detail', params: { id } })
}

export const saveRoleApi = (data: RoleType): Promise<IResponse<RoleType>> => {
  return request.post({ url: '/role/save', data })
}

export const getRoleListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/role/list', params })
}

export const deleteRoleListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/role/delete', data: { ids } })
}

export const getRolePermissionListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/role/permissionList', params })
}

export const getRolePermissionDetailApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/role/permissionDetail', data: params })
}

export const updateRolePermissionListApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/role/updateRolePermissionList', data: params })
}

export const removeRolePermissionListApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/role/removeRolePermissionList', data: params })
}

export const updateRolePermissionApi = (params: PermissionType): Promise<IResponse> => {
  return request.post({ url: '/role/updateRolePermission', data: params })
}

// role organization
export const getRoleOrganizationListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/roleOrganization/list', params })
}

export const addRoleOrganizationsApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/roleOrganization/addRoleOrganizations', data: params })
}

export const deleteRoleOrganizationListApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/roleOrganization/delete', data: params })
}
