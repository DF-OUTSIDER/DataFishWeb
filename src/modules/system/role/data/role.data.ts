import { h, reactive } from 'vue'
import { ElSwitch } from 'element-plus'
import i18n from '@/locales'

import { CrudSchema } from '@/hooks/web/useCrudSchemas'
import { useValidator } from '@/hooks/web/useValidator'

import { RoleType } from '../api/types'

const { required } = useValidator()

const { t } = i18n.global

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('roleVo.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'name',
    label: t('roleVo.name'),
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
    label: t('roleVo.code'),
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'enable',
    label: t('roleVo.enable'),
    formatter: (row: RoleType) => {
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
    label: t('tableDemo.action'),
    form: { show: false }
  }
])

export { crudSchemas }
