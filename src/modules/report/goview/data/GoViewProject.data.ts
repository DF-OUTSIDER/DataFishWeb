/*
 * @Author: outsider
 * @Date: 2023-06-16
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
import { GoViewProjectType } from '../api/types'

const { required } = useValidator()

const { t } = i18n.global

export const formProps = {
  formExpose: {},
  actionType: ''
} as FormProps

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('baseVo.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'name',
    label: '项目名称'
  },
  {
    field: 'code',
    label: '项目码'
  },
  {
    field: 'enable',
    label: t('baseVo.enable'),
    formatter: (row: GoViewProjectType) => {
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
    field: 'status',
    label: '发布状态',
    table: {
      component: 'Switch',
      componentProps: {
        activeValue: 1,
        inactiveValue: 0,
        disabled: true
      }
    },
    form: {
      component: 'Switch',
      componentProps: {
        activeValue: 1,
        inactiveValue: 0
      }
    }
  },
  {
    field: 'preview',
    label: '预览',
    form: {
      component: 'Image',
      componentProps: {
        src: get
      }
    }
  },
  {
    field: 'content',
    label: '内容',
    table: { show: false }
  },
  {
    field: 'remark',
    label: '备注',
    table: { show: false }
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
