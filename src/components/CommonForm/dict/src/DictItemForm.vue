<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\CommonForm\dict\src\DictItemForm.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <Form :rules="rules" @register="register" />
</template>

<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'

import { useValidator } from '@/hooks/web/useValidator'

import { getDictItemListApi } from '@/modules/system/dict/api'
import { DictItemQuery, DictItemType } from '@/modules/system/dict/api/types'
import { schema } from './DictItemForm.data'

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

// const getColorDict = async () => {
//   let params: Params = {}
//   params.dictCode = 'color_type'
//   const res = await getDictItemListApi(params as DictItemQuery)
//   if (res) {
//     schema[4].componentProps!.options = res.data.list
//   }
// }
// getColorDict()

const rules = reactive({
  name: [required()],
  code: [required()],
  enable: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema: schema
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
