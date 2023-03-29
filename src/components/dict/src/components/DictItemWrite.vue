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

import { getDictItemListApi } from '@/system/dict/api'
import { DictItemType } from '@/system/dict/api/types'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<DictItemType>>,
    default: () => null
  }
})

interface Params {
  dictCode?: string
}

const { t } = useI18n()

const schema = reactive<FormSchema[]>([
  {
    field: 'name',
    label: t('dictItemVo.name'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'code',
    label: t('dictItemVo.code'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'enable',
    label: t('dictItemVo.enable'),
    component: 'Switch',
    value: true,
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'sort',
    label: t('dictItemVo.sort'),
    component: 'InputNumber',
    value: 0,
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'colorCode',
    label: t('dictItemVo.colorCode'),
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'option1',
          value: '1'
        },
        {
          label: 'option2',
          value: '2'
        }
      ]
    }
  }
])

const getColorDict = async () => {
  let params: Params = {}
  params.dictCode = 'color_type'
  const res = await getDictItemListApi(params)
  if (res) {
    schema[4].componentProps!.options = res.data.list
  }
}
getColorDict()

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
