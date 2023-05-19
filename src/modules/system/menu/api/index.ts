/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-19
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\menu\api\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
import request from '@/config/axios'

// get params
export const getMenuApi = (params: any): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/menu/list', params })
}

export const getUserMenuApi = (params: any): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/menu/userMenuList', params })
}

export const getMenuCascaderApi = (): Promise<IResponse> => {
  return request.get({ url: '/menu/getMenuCascader' })
}

// post 参数必须是data
export const saveMenuApi = (
  data: AppCustomRouteRecordRaw
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.post({ url: '/menu/save', data })
}

export const deleteMenuListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/menu/delete', data: { ids } })
}

export const getMenuDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/menu/detail', params: { id } })
}
