<template>
  <Form :rules="rules" @register="register" />
</template>

<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { propTypes } from '@/utils/propTypes'

import { useI18n } from 'vue-i18n'
import { useValidator } from '@/hooks/web/useValidator'
import { IDomEditor } from '@wangeditor/editor'
import { FormSchema } from '@/types/form'

import { TimerTaskType } from '@/tool/timer_task/api/types'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TimerTaskType>>,
    default: () => null
  }
})

const { t } = useI18n()

const schema = reactive<FormSchema[]>([
  {
    field: 'name',
    label: t('timerTaskVo.name'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'code',
    label: t('timerTaskVo.code'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'enable',
    label: t('timerTaskVo.enable'),
    component: 'Switch',
    value: true,
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'cronExpression',
    label: t('timerTaskVo.cronExpression'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'startTime',
    label: t('timerTaskVo.startTime'),
    component: 'DatePicker',
    componentProps: {
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'endTime',
    label: t('timerTaskVo.endTime'),
    component: 'DatePicker',
    componentProps: {
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'beanName',
    label: t('timerTaskVo.beanName'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'methodName',
    label: t('timerTaskVo.methodName'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'params',
    label: t('timerTaskVo.params'),
    component: 'Input'
    // ,
    // formItemProps: {
    //   rules: [required()]
    // }
  },
  {
    field: 'subTasks',
    label: t('timerTaskVo.subTasks'),
    component: 'Input'
    // ,
    // formItemProps: {
    //   rules: [required()]
    // }
  }
])

const rules = reactive({
  name: [required()],
  code: [required()],
  enable: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues, setSchema } = methods

    setValues(currentRow)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  elFormRef,
  getFormData: methods.getFormData
})
</script>
