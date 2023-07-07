/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Form\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Form from './src/Form.vue'
import { ElForm } from 'element-plus'
import { FormSchema, FormSetPropsType } from '@/types/form'

export interface FormExpose {
  setValues: (data: Recordable) => void
  setProps: (props: Recordable) => void
  getSchema: (field: string) => FormSchema
  delSchema: (field: string) => void
  addSchema: (formSchema: FormSchema, index?: number) => void
  updateSchema: (formSchema: FormSchema, field: string) => void
  setSchema: (schemaProps: FormSetPropsType[]) => void
  formModel: Recordable
  getElFormRef: () => ComponentRef<typeof ElForm>
}

export { Form }
