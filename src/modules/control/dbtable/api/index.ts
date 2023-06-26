/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-03-14
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\control\dbtable\api\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '@/config/axios'
import { DbTableType, DbTableConfigType } from './types'

export const getDbTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/dbTable/list', params })
}

export const saveDbTableConfigApi = (
  data: DbTableConfigType
): Promise<IResponse<DbTableConfigType>> => {
  return request.post({ url: '/dbTableConfig/save', data })
}

export const getDbTableConfigDetailApi = (code: string, dbsourceId: number): Promise<IResponse> => {
  return request.get({ url: '/dbTableConfig/detail', params: { code, dbsourceId } })
}

// 生成代码
export const createCodeApi = (data: DbTableType): Promise<IResponse> => {
  return request.post({ url: '/codeGenerator/create', data })
}
