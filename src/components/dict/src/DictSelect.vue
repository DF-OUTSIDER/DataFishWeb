<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\Dict\src\DictSelect.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ElSelect v-model="valueRef" class="m-2" placeholder="" size="default">
    <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </ElSelect>
</template>
<script setup lang="ts">
import { getDictItemsApi } from '@/modules/system/dict/api'
import { DictItemQuery } from '@/modules/system/dict/api/types'
import { propTypes } from '@/utils/propTypes'
import { ElSelect, ElOption } from 'element-plus'
import { PropType, ref, onBeforeMount, watch, unref } from 'vue'

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
  }
})

const emit = defineEmits(['update:modelValue'])

// 输入框的值
const valueRef = ref(props.modelValue)
// 多选
//const value = ref<string[]>([])

let dictItemQuery = {
  dictCode: props.dictCode,
  enable: true
}

interface ListItem {
  value: string
  label: string
}

const options = ref<ListItem[]>([])

getDictItemsApi(dictItemQuery as DictItemQuery).then((res) => {
  if (res) {
    options.value = res.data
  }
})

// @change="valueChange"
// const valueChange = (val) => {
//   valueRef.value = val
// }

// watch(
//   () => props.modelValue,
//   (val: string) => {
//     if (val === unref(valueRef)) return
//     valueRef.value = val
//   }
// )

// 监听, 必须添加，否则校验无法通过
watch(
  () => valueRef.value,
  (val: string | number | boolean) => {
    emit('update:modelValue', val)
  }
)

onBeforeMount(() => {})
</script>
