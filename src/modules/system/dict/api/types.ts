import { BaseType } from '@/api/common/type'

/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-31
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\dict\api\types.ts
 * @Description:
 *
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved.
 */
export type DictType = {} & BaseType

export type DictItemType = {
  sort: number
  dictId: number
  // 颜色color_type字典码
  colorCode: string

  label: string
  value: string
} & BaseType

export type DictItemQuery = {
  dictId: number
  dictCode: string
} & BaseType
