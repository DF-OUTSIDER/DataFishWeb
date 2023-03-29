<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-03-20 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\control\dbtable\views\page\DbTableConfigWrite.vue
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

import { useI18n } from 'vue-i18n'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'

import { DbTableConfigType } from '../../api/types'

const { t } = useI18n()

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<DbTableConfigType>>,
    default: () => null
  }
})

const schema = reactive<FormSchema[]>([
  {
    field: 'code',
    label: t('dbTableConfigVo.code'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'author',
    label: t('dbTableConfigVo.author'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'packageName',
    label: t('dbTableConfigVo.packageName'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'module',
    label: t('dbTableConfigVo.module'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'className',
    label: t('dbTableConfigVo.className'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'comment',
    label: t('dbTableConfigVo.tableComment'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'templatePath',
    label: t('dbTableConfigVo.templatePath'),
    component: 'Input',
    formItemProps: {
      // rules: [required()]
    }
  },
  {
    field: 'codePath',
    label: t('dbTableConfigVo.codePath'),
    component: 'Input',
    formItemProps: {
      // rules: [required()]
    }
  },
  {
    field: 'field1',
    label: t('dbTableConfigVo.redirect'),
    component: 'Divider',
    componentProps: {
      contentPosition: 'center',
      borderStyle: 'dotted'
    }
  },
  {
    field: 'includeTable',
    label: t('dbTableConfigVo.includeTable'),
    component: 'Switch',
    value: false,
    formItemProps: {
      // rules: [required()]
    }
  },
  {
    field: 'includeDti',
    label: t('dbTableConfigVo.includeDti'),
    component: 'Switch',
    value: false,
    formItemProps: {
      // rules: [required()]
    }
  },
  {
    field: 'includeJpaDao',
    label: t('dbTableConfigVo.includeJpaDao'),
    component: 'Switch',
    value: false,
    formItemProps: {
      // rules: [required()]
    }
  },
  {
    field: 'includeMybatisDao',
    label: t('dbTableConfigVo.includeMybatisDao'),
    component: 'Switch',
    value: false,
    formItemProps: {
      // rules: [required()]
    }
  },
  {
    field: 'includeModule',
    label: t('dbTableConfigVo.includeModule'),
    component: 'Switch',
    value: false,
    formItemProps: {
      // rules: [required()]
    }
  },
  {
    field: 'includeService',
    label: t('dbTableConfigVo.includeService'),
    component: 'Switch',
    value: false,
    formItemProps: {
      // rules: [required()]
    }
  },
  {
    field: 'includeController',
    label: t('dbTableConfigVo.includeController'),
    component: 'Switch',
    value: false,
    formItemProps: {
      // rules: [required()]
    }
  },
  {
    field: 'field1',
    //label: t('dbTableConfigVo.redirectVue3'),
    component: 'Divider',
    componentProps: {
      contentPosition: 'center',
      borderStyle: 'dotted'
    }
  },
  {
    field: 'includeVue3',
    label: t('dbTableConfigVo.includeVue3'),
    component: 'Switch',
    value: false,
    formItemProps: {
      // rules: [required()]
    }
  }
])

const rules = reactive({
  tableId: [required()],
  module: [required()],
  className: [required()]
  //   pageviews: [required()],
  //   display_time: [required()],
  //   content: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema
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
