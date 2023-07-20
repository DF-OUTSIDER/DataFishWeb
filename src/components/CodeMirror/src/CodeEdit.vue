<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\CodeMirror\src\CodeEdit.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <Codemirror
    v-model="code"
    placeholder="Code gose here..."
    :style="{ height: '400px', width: '100%' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tabSize="2"
    :extensions="extensions"
  />
</template>

<script setup lang="ts">
import { PropType, ref, unref, watch } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { FormProps } from '@/api/common/type'
//import { getFileContent } from '@/api/infra/fileList'

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

const code = ref(props.modelValue)
// 样式
const extensions = [javascript(), oneDark]

// 乱码处理
// (data) => {
//   if (data) {
//     let gbkdecoder = new TextDecoder('GBK')
//     let result = gbkdecoder.decode(data)
//     if (result.indexOf('code') !== -1) {
//       let utf8decoder = new TextDecoder('UTF-8')
//       let result = utf8decoder.decode(data)
//       message.error(JSON.parse(result).msg)
//     } else {
//       code.value = result
//     }
//   }
// 编辑默认值
watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(code)) return
    code.value = val
    //setSrc(val)
  }
)

// 监听, 必须添加，否则校验无法通过
watch(
  () => code.value,
  (val: string) => {
    //setSrc(val)
    emit('update:modelValue', val)
    if (props.formProps) {
      // 数据联动
      props.linkage(props.formProps)
    }
  }
)
</script>
