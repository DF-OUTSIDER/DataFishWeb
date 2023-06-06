/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\CommonForm\role\src\PermissionForm.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { reactive, h } from 'vue'
import i18n from '@/locales'
import { FormSchema } from '@/types/form'

import { useValidator } from '@/hooks/web/useValidator'
import { FormProps } from '@/api/common/type'
import { ElMessage } from 'element-plus'
const { required } = useValidator()

const { t } = i18n.global

export const formProps = {
  formExpose: {},
  actionType: ''
} as FormProps

const isShowSchema = (data: Recordable, formProps: FormProps, colName: string) => {
  const colSchema = formProps?.formExpose?.getSchema(colName)
  if (data.hasAuthoritys[colName]) {
    colSchema.hidden = false
  } else {
    colSchema.hidden = true
  }
}

const listLinkage = (formProps: FormProps) => {
  // 获取表单数据
  const data = formProps?.formExpose?.formModel as Recordable
  if (data) {
    isShowSchema(data, formProps, 'hasList')
    isShowSchema(data, formProps, 'hasInsert')
    isShowSchema(data, formProps, 'hasUpdate')
    isShowSchema(data, formProps, 'hasDelete')
  }
}

const schema = reactive<FormSchema[]>([
  {
    field: 'name',
    label: t('permissionVo.name'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'hasList',
    label: t('common.list'),
    component: 'SwitchLinkage',
    componentProps: {
      formProps: formProps,
      linkage: listLinkage
    },
    value: false,
    colProps: {
      span: 4
    }
  },
  {
    field: 'hasInsert',
    label: t('common.insert'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  },
  {
    field: 'hasUpdate',
    label: t('common.update'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  },
  {
    field: 'hasDelete',
    label: t('common.delete'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  }
])

export { schema }
