<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-11 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\role\src\components\PermissionWrite.vue
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
import { propTypes } from '@/utils/propTypes'

import { useI18n } from 'vue-i18n'
import { useValidator } from '@/hooks/web/useValidator'
import { IDomEditor } from '@wangeditor/editor'
import { FormSchema } from '@/types/form'

import { InputPassword } from '@/components/InputPassword'
import { PermissionType } from '@/api/permission/types'

const { required } = useValidator()

const props = defineProps({
  isShowPass: propTypes.bool.def(false),
  currentRow: {
    type: Object as PropType<Nullable<PermissionType>>,
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
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'hasList',
    label: t('common.list'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  },
  {
    field: 'hasInsert',
    label: t('common.insert'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  },
  {
    field: 'hasUpdate',
    label: t('common.update'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  },
  {
    field: 'hasDelete',
    label: t('common.delete'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  }
])

const rules = reactive({
  username: [required()],
  realname: [required()],
  encryptionType: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues, setSchema } = methods

    let hasAuthoritys = currentRow.hasAuthoritys
    // 必须倒序删除，数组长度变化正序删除会溢出
    if (!hasAuthoritys.hasDelete) {
      // 删除权限字段
      schema.splice(4, 1)
    }
    if (!hasAuthoritys.hasUpdate) {
      // 更新权限字段
      schema.splice(3, 1)
    }
    if (!hasAuthoritys.hasInsert) {
      // 新增权限字段
      schema.splice(2, 1)
    }
    if (!hasAuthoritys.hasList) {
      // 查看权限字段
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
