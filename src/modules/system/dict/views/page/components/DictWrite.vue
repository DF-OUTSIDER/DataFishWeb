<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-02-01 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\dict\views\page\components\DictWrite.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <Form :rules="rules" @register="register" />
</template>

<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'

import { useValidator } from '@/hooks/web/useValidator'

import { crudSchemas } from '../../../data/Dict.data'
import { useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { DictType } from '@/modules/system/dict/api/types'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<DictType>>,
    default: () => null
  }
})

const rules = reactive({
  name: [required()],
  code: [required()],
  enable: [required()]
})

const { allSchemas } = useCrudSchemas(crudSchemas)

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
    // 深度监听
    deep: true,
    /*
     * 表示在watch中首次绑定的时候，是否执行handler;
     * true代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法，
     * 如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行。
     */
    immediate: true
  }
)

defineExpose({
  elFormRef,
  getFormData: methods.getFormData
})
</script>
