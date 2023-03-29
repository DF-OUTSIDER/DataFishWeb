/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\types\table.d.ts
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
export type TableColumn = {
  field: string
  label?: string
  children?: TableColumn[]
} & Recordable

export type TableSlotDefault = {
  row: Recordable
  column: TableColumn
  $index: number
} & Recordable

export interface Pagination {
  small?: boolean
  background?: boolean
  pageSize?: number
  defaultPageSize?: number
  total?: number
  pageCount?: number
  pagerCount?: number
  currentPage?: number
  defaultCurrentPage?: number
  layout?: string
  pageSizes?: number[]
  popperClass?: string
  prevText?: string
  nextText?: string
  disabled?: boolean
  hideOnSinglePage?: boolean
}

export interface TableSetPropsType {
  field: string
  path: string
  value: any
}

export interface TreeProps {
  hasChildren: string
  children: string
}
