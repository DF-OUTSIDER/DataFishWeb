<template>
  <Form :rules="rules" @register="register" />
</template>

<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'

import { ElSelectV2 } from 'element-plus'

import { useI18n } from 'vue-i18n'
import { useValidator } from '@/hooks/web/useValidator'
import { IDomEditor } from '@wangeditor/editor'
import { FormSchema } from '@/types/form'
import { MenuPermission } from '@/api/permission/types'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<MenuPermission>>,
    default: () => null
  }
})

const { t } = useI18n()

const schema = reactive<FormSchema[]>([
  {
    field: 'name',
    label: t('permissionVo.name'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  //   {
  //     field: 'code',
  //     label: t('permissionVo.code'),
  //     component: 'Input',
  //     formItemProps: {
  //       rules: [required()]
  //     }
  //   },
  //   {
  //     field: 'enable',
  //     label: t('permissionVo.enable'),
  //     component: 'Switch',
  //     value: true
  //   },
  {
    field: 'enable',
    label: t('permissionVo.enable'),
    component: 'Select',
    value: 1,
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: t('common.disabled'),
          value: 0
        },
        {
          label: t('common.enable'),
          value: 1
        }
      ]
    }
  },
  {
    field: 'actionId',
    label: t('permissionVo.actionId'),
    component: 'Select',
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: t('common.insert'),
          value: 1
        },
        {
          label: t('common.update'),
          value: 2
        },
        {
          label: t('common.delete'),
          value: 3
        },
        {
          label: t('common.list'),
          value: 4
        }
      ]
    }
  }
])

const rules = reactive({
  name: [required()],
  code: [required()]
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
    //setSchema([])
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
