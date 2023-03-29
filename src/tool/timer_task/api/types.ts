/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-02-08
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\tool\timer_task\api\types.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export type TimerTaskType = {
  id: number
  name: string
  code: string
  enable: boolean
  cronExpression: string
  beanName: string
  methodName: string
  params: string
  subTasks: string
}
