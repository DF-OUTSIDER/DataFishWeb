import { FormExpose } from '@/components/Form'

/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\api\common\type.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export type BaseType = {
  id: number
  name: string
  code: string
  enable: boolean
} & Recordable

export type FormProps = {
  formExpose: FormExpose
  // example curd create\update\read\delete
  actionType: string
}
