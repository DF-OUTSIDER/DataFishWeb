<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-04 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\role\views\page\components\RoleWrite.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <Form @register="register" />
</template>

<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'

import { FormSchema } from '@/types/form'

import { RoleType } from '@/modules/system/role/api/types'

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<RoleType>>,
    default: () => null
  },
  schema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})

const schema = reactive<FormSchema[]>(props.schema)
const { register, methods, elFormRef } = useForm({
  schema
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues } = methods

    if (currentRow.code == 'admin') {
      // 超级管理员删除代码设置字段
      schema.splice(1, 1)
    }

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
