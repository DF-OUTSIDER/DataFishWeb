<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-20 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\views\menu\page\components\MenuWrite.vue
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

import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { IDomEditor } from '@wangeditor/editor'
import { FormSchema } from '@/types/form'
import { getMenuCascaderApi } from '@/system/menu/api'
import { ComponentOptions } from '@/types/components'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<Nullable<AppCustomRouteRecordRaw>>,
    default: () => null
  }
})

const { t } = useI18n()

const menuCascader = async () => {
  let data: ComponentOptions[] = []
  const res = await getMenuCascaderApi()
  if (res) {
    data = res.data
  }
  return data
}

let schema = reactive<FormSchema[]>([
  {
    field: 'name',
    label: t('menuVo.name'),
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
    label: t('menuVo.code'),
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
    field: 'sort',
    label: t('menuVo.sort'),
    component: 'InputNumber',
    value: 0,
    formItemProps: {
      rules: [required()]
    }
    //,
    // colProps: {
    //   span: 24
    // }
  },
  {
    field: 'path',
    label: t('menuVo.path'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'component',
    label: t('menuVo.component'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'redirect',
    label: t('menuVo.redirect'),
    component: 'Input'
  },
  {
    field: 'enable',
    label: t('menuVo.enable'),
    component: 'Switch',
    value: true
  }
])

menuCascader().then((data) => {
  schema.push(
    {
      field: 'parents',
      label: t('menuVo.parent'),
      component: 'Cascader',
      value: null,
      componentProps: {
        props: { checkStrictly: true },
        options: data
      }
    },
    {
      field: 'field1',
      label: t('metaVo.remark'),
      component: 'Divider'
    },
    {
      field: 'meta.title',
      label: t('metaVo.title'),
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    },
    {
      field: 'meta.icon',
      label: t('metaVo.icon'),
      component: 'Input'
    },
    {
      field: 'meta.noCache',
      label: t('metaVo.noCache'),
      component: 'Switch',
      value: true,
      formItemProps: {
        rules: [required()]
      }
    },
    {
      field: 'meta.alwaysShow',
      label: t('metaVo.alwaysShow'),
      component: 'Switch',
      value: false,
      formItemProps: {
        rules: [required()]
      }
    },
    {
      field: 'meta.noTagsView',
      label: t('metaVo.noTagsView'),
      component: 'Switch',
      value: false
    },
    {
      field: 'meta.hidden',
      label: t('metaVo.hidden'),
      component: 'Switch',
      value: false
    },
    {
      field: 'meta.canTo',
      label: t('metaVo.canTo'),
      component: 'Switch',
      value: false
    },
    {
      field: 'meta.activeMenu',
      label: t('metaVo.activeMenu'),
      component: 'Input'
    }
  )
})

const rules = reactive({
  name: [required()],
  enable: [required()]
})

const { register, methods, elFormRef } = useForm({
  schema
})

defineExpose({
  elFormRef,
  getFormData: methods.getFormData
})

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    const { setValues, setSchema } = methods
    setValues(currentRow)
    //setSchema([])
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
