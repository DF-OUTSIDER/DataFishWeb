/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-02-08
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\tool\timer_task\api\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '@/config/axios'
import { TimerTaskType } from './types'

export const getTimerTaskListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: '/timerTask/list', params })
}

export const deleteTimerTaskListApi = (ids: number[]): Promise<IResponse> => {
  return request.post({ url: '/timerTask/delete', data: { ids } })
}

export const saveTimerTaskApi = (data: TimerTaskType): Promise<IResponse<TimerTaskType>> => {
  return request.post({ url: '/timerTask/save', data })
}

export const getTimerTaskDetailApi = (id: number): Promise<IResponse> => {
  return request.get({ url: '/timerTask/detail', params: { id } })
}
