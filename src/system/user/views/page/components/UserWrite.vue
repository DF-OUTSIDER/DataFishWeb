<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-15
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\views\Authorization\page\components\UserWrite.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
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

import { UserType } from '@/system/user/api/types'
import { InputPassword } from '@/components/InputPassword'

const { required } = useValidator()

const props = defineProps({
  isShowPass: propTypes.bool.def(false),
  currentRow: {
    type: Object as PropType<Nullable<UserType>>,
    default: () => null
  }
})

const { t } = useI18n()

const schema = reactive<FormSchema[]>([
  {
    field: 'username',
    label: t('userVo.username'),
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
    field: 'realname',
    label: t('userVo.realname'),
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
    field: 'encryptionType',
    label: t('userVo.encryptionType'),
    component: 'Select',
    value: 1,
    formItemProps: {
      rules: [required()]
    },
    componentProps: {
      options: [
        {
          label: 'NONE',
          value: 0
        },
        {
          label: 'MD5',
          value: 1
        },
        {
          label: 'BCRYPT',
          value: 2
        }
      ]
    }
  },
  {
    field: 'password',
    label: t('userVo.password'),
    component: 'InputPassword',
    value: '123456',
    formItemProps: {
      rules: [required()]
    }
    //,
    // colProps: {
    //   span: 24
    // }
  },
  {
    field: 'enable',
    label: t('userVo.enable'),
    component: 'Switch'
    // value: 1,
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

    if (currentRow.id != null) {
      // 删除密码设置字段
      schema.splice(3, 1)
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
