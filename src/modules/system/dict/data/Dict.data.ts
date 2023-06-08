/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\dict\data\Dict.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { PropType, reactive, watch, h } from 'vue'
import { ElSwitch } from 'element-plus'
import i18n from '@/locales'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useValidator } from '@/hooks/web/useValidator'

import { DictType } from '../api/types'

const { required } = useValidator()

const { t } = i18n.global

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('dictVo.index'),
    type: 'index',
    form: { show: false },
    detail: { show: false }
  },
  {
    field: 'name',
    label: t('dictVo.name'),
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'code',
    label: t('dictVo.code'),
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'enable',
    label: t('dictVo.enable'),
    formatter: (row: DictType) => {
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
    field: 'action',
    width: '360px',
    label: t('tableDemo.action'),
    form: { show: false }
  }
])

export { crudSchemas }
