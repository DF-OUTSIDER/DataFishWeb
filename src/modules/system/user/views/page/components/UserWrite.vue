<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\user\views\page\components\UserWrite.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <Form ref="formRef" @register="register" :rules="rules" />
</template>

<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch, toRef } from 'vue'
import { propTypes } from '@/utils/propTypes'

import { FormSchema } from '@/types/form'

import { UserType } from '@/modules/system/user/api/types'
import { formProps } from '../../../data/User.data'
// import { ElMessage } from 'element-plus'

const props = defineProps({
  isShowPass: propTypes.bool.def(false),
  currentRow: {
    type: Object as PropType<Nullable<UserType>>,
    default: () => null
  },
  schema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  },
  rules: {
    type: Array as PropType<Recordable[]>,
    default: () => []
  },
  // 判断是新增还是编辑
  actionType: propTypes.string.def('')
})

const formRef = toRef(formProps, 'formExpose')
const actionType = props.actionType as string
formProps.actionType = actionType

// ElMessage.info(formProps.actionType)

const schema = reactive<FormSchema[]>(props.schema)
const rules = reactive<Recordable[]>(props.rules)

const { register, methods, elFormRef } = useForm({
  schema: schema
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues } = methods

    // if (currentRow.id != null) {
    //   // 删除密码设置字段
    //   schema.splice(3, 1)
    // }

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
