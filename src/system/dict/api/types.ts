/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-31
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\api\dict\types.ts
 * @Description:
 *
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved.
 */
export type DictType = {
  id: number
  name: string
  code: string
  enable: boolean
}

export type DictItemType = {
  id: number
  sort: number
  name: string
  code: string
  enable: boolean
  dictId: number
  // 颜色color_type字典码
  colorCode: string

  label: string
  value: string
}
