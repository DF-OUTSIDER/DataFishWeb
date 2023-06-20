/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\utils\form.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { FormProps } from '@/api/common/type'

export const formUtil = {
  isShow: (colName: string) => {
    return true
  },
  isShowSchema: (data: Recordable, formProps: FormProps, colName: string) => {
    isShowSchema(data, formProps, colName)
  },
  isHidden: (colName: string) => {
    return true
  },
  isHiddenSchema: (data: Recordable, formProps: FormProps, colName: string) => {
    isHiddenSchema(data, formProps, colName)
  }
}

export const getFormData = (formProps: FormProps) => {
  return formProps?.formExpose?.formModel as Recordable
}

// 设置属性隐藏或显示 data.hasAuthoritys[colName]
const isShowSchema = (data: Recordable, formProps: FormProps, colName: string) => {
  const colSchema = formProps?.formExpose?.getSchema(colName)
  if (formUtil.isShow(colName)) {
    colSchema.hidden = false
  } else {
    colSchema.hidden = true
  }
}

const isHiddenSchema = (data: Recordable, formProps: FormProps, colName: string) => {
  const colSchema = formProps?.formExpose?.getSchema(colName)
  if (formUtil.isHidden(colName)) {
    colSchema.hidden = true
  } else {
    colSchema.hidden = false
  }
}
