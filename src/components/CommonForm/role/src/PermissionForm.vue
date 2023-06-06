<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-11 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\CommonForm\role\src\PermissionForm.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <Form ref="formRef" @register="register" />
</template>

<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, toRef, watch } from 'vue'
//import { propTypes } from '@/utils/propTypes'

import { PermissionType } from '@/modules/system/permission/api/types'
import { schema, formProps } from './PermissionForm.data'

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<PermissionType>>,
    default: () => null
  }
})

const formRef = toRef(formProps, 'formExpose')

// const rules = reactive({
//   username: [required()],
//   realname: [required()],
//   encryptionType: [required()]
// })

const { register, methods, elFormRef } = useForm({
  schema: schema
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues } = methods

    let hasAuthoritys = currentRow.hasAuthoritys
    // 必须倒序删除，数组长度变化正序删除会溢出
    if (!hasAuthoritys.hasDelete) {
      // 删除权限字段
      //schema.splice(4, 1)
    }
    if (!hasAuthoritys.hasUpdate) {
      // 更新权限字段
      //schema.splice(3, 1)
    }
    if (!hasAuthoritys.hasInsert) {
      // 新增权限字段
      //schema.splice(2, 1)
    }
    if (!hasAuthoritys.hasList) {
      // 查看权限字段
      //schema.splice(1, 1)
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
