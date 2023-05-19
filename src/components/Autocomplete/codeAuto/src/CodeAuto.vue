<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\Autocomplete\codeAuto\src\CodeAuto.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <el-input disabled v-model="valueRef" />
</template>

<script setup lang="ts">
import { ref, unref, watch } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { getCode } from '@/utils'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: propTypes.string.def(''),
  codePre: propTypes.string.def('')
})

// 输入框的值
const valueRef = ref(props.modelValue)

if (valueRef.value === '') {
  let val = getCode(props.codePre)
  valueRef.value = val
  emit('update:modelValue', val)
}

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
  }
)

// 监听
watch(
  () => valueRef.value,
  (val: string) => {
    emit('update:modelValue', val)
  }
)
</script>
