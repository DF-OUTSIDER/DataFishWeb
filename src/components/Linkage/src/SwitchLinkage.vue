<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Linkage\src\SwitchLinkage.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ElSwitch v-model="valueRef" active-value="100"
      inactive-value="0" />
</template>

<script setup lang="ts">
import { ElSwitch } from 'element-plus'
import { PropType, ref, watch, unref } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { FormProps } from '@/api/common/type'

const props = defineProps({
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: null
  },
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

// 编辑默认值
watch(
  () => props.modelValue,
  (val: boolean) => {
    if (props.formProps) {
      // 数据联动
      props.linkage(props.formProps)
    }
    if (val === unref(valueRef)) return
    valueRef.value = val
  },
  {
    deep: true
    // ,
    // immediate: true
  }
)

// 加载完就执行
// onUpdated(() => {
//   if (props.formProps) {
//     // 数据联动
//     props.linkage(props.formProps)
//   }
// })

// 监听, 必须添加，否则校验无法通过
watch(
  () => valueRef.value,
  (val: boolean) => {
    emit('update:modelValue', val)

    if (props.formProps) {
      // 数据联动
      props.linkage(props.formProps)
    }
  }
)
</script>
