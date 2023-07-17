/*
 * @Author: outsider
 * @Date: 2023-06-19
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */

import { h, reactive } from 'vue'
import { ElMessage, ElSwitch } from 'element-plus'
import i18n from '@/locales'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useValidator } from '@/hooks/web/useValidator'

import { FormProps } from '@/api/common/type'
import { DbSourceType } from '../api/types'
import { getFormData } from '@/utils/form'

const { required } = useValidator()

const { t } = i18n.global

export const formProps = {
  formExpose: {},
  actionType: '' // create, edit
} as FormProps

// 表单初始化方法
export const initForm = (formProps: FormProps) => {
  // 获取表单数据
  const data = getFormData(formProps)

  ElMessage.info('表单初始化方法：' + formProps.actionType)
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('baseVo.index'),
    type: 'index',
    form: { show: false },
    detail: { show: false }
  },
  {
    field: 'code',
    label: '数据源唯一码',
    form: {
      colProps: {
        span: 24
      }
    }
  },
  {
    field: 'enable',
    label: t('baseVo.enable'),
    formatter: (row: DbSourceType) => {
      return h(ElSwitch, { modelValue: row.enable, disabled: true })
    },
    form: {
      component: 'Switch',
      value: true,
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'type',
    label: '数据库类型',
    form: {
      component: 'DictSelect',
      componentProps: {
        dictCode: 'db_source_type',
        formProps: formProps
      }
    }
  },
  {
    field: 'driver',
    label: '数据库驱动',
    table: { show: false }
  },
  {
    field: 'name',
    label: '数据库名称'
  },
  {
    field: 'username',
    label: '数据库用户名',
    table: { show: false }
  },
  {
    field: 'password',
    label: '数据库密码',
    form: {
      component: 'InputPassword'
    },
    table: { show: false },
    detail: { show: false }
  },
  {
    field: 'url',
    label: '数据库URL',
    table: { show: false },
    form: {
      colProps: {
        span: 24
      }
    }
  },
  {
    field: 'action',
    width: '360px',
    label: t('baseVo.action'),
    form: { show: false },
    detail: { show: false }
  }
])

export const { allSchemas } = useCrudSchemas(crudSchemas)
