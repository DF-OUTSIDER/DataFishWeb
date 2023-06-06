import { FormProps } from '@/api/common/type'

export const formUtil = {
  isShowCell: (colName: string) => {
    return true
  },
  isShowSchema: (data: Recordable, formProps: FormProps, colName: string) => {
    isShowSchema(data, formProps, colName)
  }
}

// 设置属性隐藏或显示 data.hasAuthoritys[colName]
const isShowSchema = (data: Recordable, formProps: FormProps, colName: string) => {
  const colSchema = formProps?.formExpose?.getSchema(colName)
  if (formUtil.isShowCell(colName)) {
    colSchema.hidden = false
  } else {
    colSchema.hidden = true
  }
}
