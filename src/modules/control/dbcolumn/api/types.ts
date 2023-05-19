/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-03-15
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\control\dbcolumn\api\types.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export type DbColumnType = {
  id: number
  code: string
  name: string
  tableName: string
  isNullable: string
  dataType: string
  columnComment: string
  columnKey: string
  extra: string
  columnConfig: DbColumnConfigType
}

export type DbColumnConfigType = {
  id: number
  code: string
  name: string

  // 表单类型
  formType: string

  // 非空
  notNull: boolean

  // 列表显示
  listShow: boolean
  // 新增显示
  addShow: boolean

  // 编辑显示
  updateShow: boolean

  // 查询方式
  queryType: string

  // 注释
  comment: string

  // 字典预留
  dictCode: string
}
