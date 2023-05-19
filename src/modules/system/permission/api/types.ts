/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-29
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\permission\api\types.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
export type MenuPermission = {
  id: number
  name: string
  code: string
  enable: boolean
  menuId: number
  actionId: number
  sort: number
} & Recordable

export type PermissionType = {
  hasAuthoritys: any

  id: number
  codes: string

  hasList: boolean
  hasInsert: boolean
  hasUpdate: boolean
  hasDetele: boolean
} & Recordable
