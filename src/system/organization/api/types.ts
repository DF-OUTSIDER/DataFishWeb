/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-13
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\api\organization\types.ts
 * @Description:
 *
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved.
 */
export type organizationType = {
  id: number
  name: string
  code: string
  enable: boolean
  sort: number
  parents: number[]
}

export type organizationTreeType = {
  id: number
  pid: number
  label: string
  // 禁止拖动
  noDragging: boolean
  horizontal: boolean
  collapsable: boolean
  onlyOneNode: boolean
  expandAll: boolean
  // 禁止编辑
  disaled: boolean
}
