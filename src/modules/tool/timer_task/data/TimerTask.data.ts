import { h, reactive } from 'vue'
import { ElSwitch } from 'element-plus'
import i18n from '@/locales'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useValidator } from '@/hooks/web/useValidator'

import { TimerTaskType } from '../api/types'

const { required } = useValidator()

const { t } = i18n.global

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('timerTaskVo.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'name',
    label: t('timerTaskVo.name'),
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'code',
    label: t('timerTaskVo.code'),
    form: {
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'enable',
    label: t('dictVo.enable'),
    formatter: (row: TimerTaskType) => {
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
    field: 'cronExpression',
    label: t('timerTaskVo.cronExpression'),
    table: { show: false },
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'startTime',
    label: t('timerTaskVo.startTime'),
    table: { show: false },
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      },
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'endTime',
    label: t('timerTaskVo.endTime'),
    table: { show: false },
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      },
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'beanName',
    label: t('timerTaskVo.beanName'),
    table: { show: false },
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'methodName',
    label: t('timerTaskVo.methodName'),
    table: { show: false },
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'params',
    label: t('timerTaskVo.params'),
    table: { show: false },
    form: {
      component: 'Input'
    }
  },
  {
    field: 'subTasks',
    label: t('timerTaskVo.subTasks'),
    table: { show: false },
    form: {
      component: 'Input'
    }
  },
  {
    field: 'action',
    width: '360px',
    label: t('tableDemo.action'),
    form: { show: false }
  }
])

export const { allSchemas } = useCrudSchemas(crudSchemas)
