<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Linkage\src\ImageLinkage.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ElInput v-model="valueRef" style="width: 189.5px; display: none" size="default" />
  <el-image :src="srcRef" lazy />
</template>
<script setup lang="ts">
import { ElImage, ElInput } from 'element-plus'
import { PropType, ref, watch, unref, onMounted } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { FormProps } from '@/api/common/type'

import { getUploadFileDetailByCodeApi } from '@/modules/control/upload_file/api'

const props = defineProps({
  modelValue: propTypes.string.def(''),
  formProps: {
    type: Object as PropType<FormProps>,
    default: null
  },
  linkage: {
    type: Function as PropType<(formProps: FormProps) => void>,
    default(formProps: FormProps) {
      const data = formProps?.formExpose?.formModel as Recordable
      console.log(data?.code?.toString())
    }
  }
})

const emit = defineEmits(['update:modelValue'])
// 输入框的值
const valueRef = ref(props.modelValue)
const srcRef = ref('')

const setSrc = (code: string) => {
  getUploadFileDetailByCodeApi(code).then((res) => {
    if (res) {
      const data = res.data
      srcRef.value = data.url
    }
  })
}

// 编辑默认值
watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
    setSrc(val)
  }
)

// 监听, 必须添加，否则校验无法通过
watch(
  () => valueRef.value,
  (val: string) => {
    //setSrc(val)
    emit('update:modelValue', val)
    if (props.formProps) {
      // 数据联动
      props.linkage(props.formProps)
    }
  }
)

onMounted(() => {})
</script>
