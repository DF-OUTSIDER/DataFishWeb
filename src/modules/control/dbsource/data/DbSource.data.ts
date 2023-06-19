/*
 * @Author: outsider
 * @Date: 2023-06-19
 * @Description:
 *
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */

import { h, reactive } from 'vue'
import { ElSwitch } from 'element-plus'
import i18n from '@/locales'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useValidator } from '@/hooks/web/useValidator'

import { FormProps } from '@/api/common/type'
import { DbSourceType } from '../api/types'

const { required } = useValidator()

const { t } = i18n.global

export const formProps = {
  formExpose: {},
  actionType: ''
} as FormProps

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'name',
    label: '名称'
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
    field: 'code',
    label: '数据库名称'
  },
  {
    field: 'username',
    label: '数据库用户名'
  },
  {
    field: 'password',
    label: '数据库密码'
  },
  {
    field: 'url',
    label: '数据库URL'
  },
  {
    field: 'driver',
    label: '数据库驱动'
  },
  {
    field: 'type',
    label: '数据库类型'
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
