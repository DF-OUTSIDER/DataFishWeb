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

import { getOrganizationCascaderApi } from '@/system/organization/api'
import { organizationType } from '@/system//organization/api/types'

const { required } = useValidator()

const props = defineProps({
  isShowPass: propTypes.bool.def(false),
  currentRow: {
    type: Object as PropType<Nullable<organizationType>>,
    default: () => null
  }
})

const { t } = useI18n()

const getOrganizationCascader = async () => {
  let data: ComponentOptions[] = []
  const res = await getOrganizationCascaderApi()
  if (res) {
    data = res.data
  }
  return data
}

let schema = reactive<FormSchema[]>([
  {
    field: 'name',
    label: t('organizationVo.name'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
    //,
    // colProps: {
    //   span: 24
    // }
  },
  {
    field: 'code',
    label: t('organizationVo.code'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
    // ,
    // colProps: {
    //   span: 24
    // }
  },
  {
    field: 'enable',
    label: t('organizationVo.enable'),
    component: 'Switch',
    value: true,
    formItemProps: {
      rules: [required()]
    }
    // ,
    // componentProps: {
    //   options: [
    //     {
    //       label: t('common.disabled'),
    //       value: 0
    //     },
    //     {
    //       label: t('common.enable'),
    //       value: 1
    //     }
    //   ]
    // }
  },
  {
    field: 'typeId',
    label: t('organizationVo.typeId'),
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
])

getOrganizationCascader().then((data) => {
  //data.checkStrictly = true
  schema.push({
    field: 'parents',
    label: t('organizationVo.parent'),
    component: 'Cascader',
    value: null,
    componentProps: {
      props: { checkStrictly: true },
      options: data
    }
  })
})

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
