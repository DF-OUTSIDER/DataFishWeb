/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\system\user\api\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '@/config/axios'
import type { UserType } from './types'

// user
export const getUserListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/user/list', params })
}

export const getUserDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/user/detail', params: { id } })
}

export const saveUserApi = (data: UserType): Promise<IResponse<UserType>> => {
  return request.post({ url: '/user/save', data })
}

export const changePasswordApi = (data: UserType): Promise<IResponse<UserType>> => {
  return request.post({ url: '/user/changePassword', data })
}

export const deleteUserListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/user/delete', data: { ids } })
}

// user profile 用户个人信息，包含用户信息，组织信息，角色信息
export const getUserProfileDetailApi = (): Promise<IResponse> => {
  return request.get({ url: '/userProfile/detail' })
}

// user role
export const getUserRoleListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/userRole/list', params })
}

export const addRoleUsersApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/userRole/addRoleUsers', data: params })
}

export const removeUserRoleApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/userRole/delete', data: params })
}

// user organization
export const getUserOrganizationListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/userOrganization/list', params })
}

export const addOrganizationUsersApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/userOrganization/addOrganizationUsers', data: params })
}

export const removeUserOrganizationApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/userOrganization/delete', data: params })
}
