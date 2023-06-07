<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Dict\src\DictRadioButton.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ElRadioGroup v-model="valueRef">
    <ElRadioButton
      v-for="option in getDictOptions(dictCode)"
      :key="option.label"
      :label="option.value"
    >
      {{ option.label }}
    </ElRadioButton>
  </ElRadioGroup>
</template>

<script setup lang="ts">
import { getDictOptions } from '@/utils/dict'

import { propTypes } from '@/utils/propTypes'
import { ElRadioGroup, ElRadioButton } from 'element-plus'
import { PropType, ref, watch, unref } from 'vue'

const props = defineProps({
  // 字典码
  dictCode: propTypes.string.def(''),
  valueType: {
    type: String as PropType<'string' | 'number' | 'boolean'>,
    default: 'string'
  },
  modelValue: {
    type: String as PropType<string>,
    default: '-1'
  },
  formProps: {
    type: Object as PropType<any>,
    default: null
  },
  linkage: {
    type: Function as PropType<(formProps: any) => void>,
    default(formProps: any) {
      const data = formProps?.formExpose?.formModel as Recordable
      console.log(data?.code?.toString())
    }
  }
})

const emit = defineEmits(['update:modelValue'])

// 输入框的值
const valueRef = ref(props.modelValue)
const dictCode = ref(props.dictCode)

// 编辑默认值
watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
  }
)

// 监听, 必须添加，否则校验无法通过
watch(
  () => valueRef.value,
  (val: string) => {
    emit('update:modelValue', val)
    if (props.formProps) {
      // 数据联动
      props.linkage(props.formProps)
    }
  }
)
</script>
