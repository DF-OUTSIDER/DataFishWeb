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

export const deleteUserListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/user/delete', data: { ids } })
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
