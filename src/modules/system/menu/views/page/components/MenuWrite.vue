<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-20 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\menu\views\page\components\MenuWrite.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <Form ref="formRef" :rules="rules" @register="register" />
</template>

<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch, ref, toRef } from 'vue'

import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'
import { formProps } from '../../../data/Menu.data'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<AppCustomRouteRecordRaw>>,
    default: () => null
  },
  schema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})
const formRef = toRef(formProps, 'formExpose')

const row = ref<Nullable<AppCustomRouteRecordRaw>>(null)
const { t } = useI18n()
const schema = reactive<FormSchema[]>(props.schema)

const rules = reactive({
  name: [required()],
  enable: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema
})

defineExpose({
  elFormRef,
  getFormData: methods.getFormData
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
</script>
