/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-19
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\system\role\api\types.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
export type RoleType = {
  id: number
  name: string
  code: string
  enable: boolean
} & Recordable

export type RoleOrganizationType = {
  id: number
  name: string
  code: string
  enable: boolean
  roleId: number
  organizationId: number
} & Recordable
