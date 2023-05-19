<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\organization\views\page\components\OrganizationWrite.vue
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
import { propTypes } from '@/utils/propTypes'

import { useI18n } from 'vue-i18n'
import { useValidator } from '@/hooks/web/useValidator'

import { crudSchemas } from '../../../data/Organization.data'
import { useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { getOrganizationCascaderApi } from '@/modules/system/organization/api'
import { organizationType } from '@/modules/system/organization/api/types'

const { required } = useValidator()

const props = defineProps({
  isShowPass: propTypes.bool.def(false),
  currentRow: {
    type: Object as PropType<Nullable<organizationType>>,
    default: () => null
  }
})

const { t } = useI18n()

const rules = reactive({
  name: [required()],
  code: [required()],
  enable: [required()]
})

const { allSchemas } = useCrudSchemas(crudSchemas)

const getOrganizationCascader = async () => {
  let data = []
  const res = await getOrganizationCascaderApi()
  if (res) {
    data = res.data
  }
  return data
}

getOrganizationCascader().then((data) => {
  allSchemas.formSchema.push({
    field: 'parents',
    label: t('organizationVo.parent'),
    component: 'Cascader',
    value: null,
    componentProps: {
      props: { checkStrictly: true },
      options: data
    }
  })
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

// 定义调用方法
defineExpose({
  elFormRef,
  getFormData: methods.getFormData
})
</script>
