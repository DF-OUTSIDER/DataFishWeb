/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\organization\data\Organization.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { reactive, h } from 'vue'
import { ElSwitch } from 'element-plus'
import { CrudSchema } from '@/hooks/web/useCrudSchemas'

import i18n from '@/locales'
import { useValidator } from '@/hooks/web/useValidator'

import { organizationType } from '@/modules/system/organization/api/types'

const { t } = i18n.global
const { required } = useValidator()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('roleVo.index'),
    type: 'index',
    form: {
      show: false
    }
  },
  {
    field: 'name',
    label: t('organizationVo.name'),
    search: {
      show: true
    },
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'code',
    label: t('organizationVo.code'),
    search: {
      show: true
    },
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'enable',
    label: t('organizationVo.enable'),
    formatter: (row: organizationType) => {
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
    field: 'typeId',
    label: t('organizationVo.typeId'),
    table: { show: false },
    form: {
      component: 'Select',
      value: 6,
      formItemProps: {
        rules: [required()]
      },
      componentProps: {
        options: [
          {
            label: t('common.parentcompany'),
            value: 1
          },
          {
            label: t('common.group'),
            value: 2
          },
          {
            label: t('common.company'),
            value: 3
          },
          {
            label: t('common.subsidiary'),
            value: 4
          },
          {
            label: t('common.branchoffice'),
            value: 5
          },
          {
            label: t('common.department'),
            value: 6
          },
          {
            label: t('common.job'),
            value: 7
          }
        ]
      }
    }
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    form: { show: false }
  }
])

export { crudSchemas }
