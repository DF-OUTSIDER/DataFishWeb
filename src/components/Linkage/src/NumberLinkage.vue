<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Linkage\src\NumberLinkage.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ElInputNumber v-model="valueRef" />
</template>

<script setup lang="ts">
import { ElInputNumber } from 'element-plus'
import { PropType, ref, onBeforeMount, watch, unref } from 'vue'
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  modelValue: propTypes.number.def(0),
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

// 编辑默认值
watch(
  () => props.modelValue,
  (val: number) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
  }
)

// 监听, 必须添加，否则校验无法通过
watch(
  () => valueRef.value,
  (val: number) => {
    emit('update:modelValue', val)
    if (props.formProps) {
      // 数据联动
      props.linkage(props.formProps)
    }
  }
)
</script>
