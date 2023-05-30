<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Linkage\src\SelectLinkage.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ElSelect v-model="valueRef" placeholder="" size="default">
    <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </ElSelect>
</template>

<script setup lang="ts">
import { FormProps } from '@/api/common/type'
import { propTypes } from '@/utils/propTypes'
import { ElSelect, ElOption } from 'element-plus'
import { PropType, ref, watch, unref } from 'vue'

interface ListItem {
  value: string
  label: string
}

const props = defineProps({
  // 字典码
  dictCode: propTypes.string.def(''),
  // 字典数据类型 string | number | boolean
  valueType: {
    type: String as PropType<'string' | 'number' | 'boolean'>,
    default: 'string'
  },
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: null
  },
  options: {
    type: Array as PropType<ListItem[]>,
    default: () => []
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
// 多选
//const value = ref<string[]>([])

const options = ref<ListItem[]>(props.options)

// 编辑默认值
watch(
  () => props.modelValue,
  (val: string | number | boolean) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
  }
)

// 监听, 必须添加，否则校验无法通过
watch(
  () => valueRef.value,
  (val: string | number | boolean) => {
    emit('update:modelValue', val)
    if (props.formProps) {
      // 数据联动
      props.linkage(props.formProps)
    }
  }
)
</script>
