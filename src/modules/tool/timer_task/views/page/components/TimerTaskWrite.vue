<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\tool\timer_task\views\page\components\TimerTaskWrite.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <Form @register="register" />
</template>

<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, watch } from 'vue'

import { TimerTaskType } from '@/modules/tool/timer_task/api/types'
import { allSchemas } from '../../../data/TimerTask.data'

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TimerTaskType>>,
    default: () => null
  }
})

const { register, methods, elFormRef } = useForm({
  schema: allSchemas.formSchema
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues } = methods

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
