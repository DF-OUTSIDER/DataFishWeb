/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-31
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\dict\api\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved.
 */
import request from '@/config/axios'
import { DictType, DictItemType, DictItemQuery } from './types'

export const getDictListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/dict/list', params })
}

export const deleteDictListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/dict/delete', data: { ids } })
}

export const saveDictApi = (data: DictType): Promise<IResponse<DictType>> => {
  return request.post({ url: '/dict/save', data })
}

export const getDictDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/dict/detail', params: { id } })
}

export const getDictItemListApi = (params: DictItemQuery): Promise<IResponse> => {
  return request.get({ url: '/dictItem/list', params })
}

export const getDictItemsApi = (params: DictItemQuery): Promise<IResponse> => {
  return request.get({ url: '/dictItem/getDictItems', params })
}

export const getTagVoApi = (params: DictItemQuery): Promise<IResponse> => {
  return request.get({ url: '/dictItem/getTagVo', params })
}

export const saveDictItemApi = (data: DictItemType): Promise<IResponse<DictItemType>> => {
  return request.post({ url: '/dictItem/save', data })
}

export const deleteDictItemApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/dictItem/delete', data: { ids } })
}

export const getDictItemDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/dictItem/detail', params: { id } })
}
