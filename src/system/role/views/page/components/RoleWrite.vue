<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-04 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\views\role\page\components\RoleWrite.vue
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

import { RoleType } from '@/system/role/api/types'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<RoleType>>,
    default: () => null
  }
})

const { t } = useI18n()

const schema = reactive<FormSchema[]>([
  {
    field: 'name',
    label: t('roleVo.name'),
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
    label: t('roleVo.code'),
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
    label: t('roleVo.enable'),
    component: 'Switch',
    value: true,
    formItemProps: {
      rules: [required()]
    }
    //,
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
  }
])

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

    if (currentRow.code == 'admin') {
      // 超级管理员删除代码设置字段
      schema.splice(1, 1)
    }

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
