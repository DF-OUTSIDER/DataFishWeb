<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Dict\src\DictTag.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ElTag :type="tagType">
    {{ label }}
  </ElTag>
</template>

<script setup lang="ts">
import { getDictItemsApi } from '@/modules/system/dict/api'
import { DictItemQuery } from '@/modules/system/dict/api/types'
import { propTypes } from '@/utils/propTypes'
import { ElTag } from 'element-plus'
import { PropType, ref, watch, unref } from 'vue'

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
const tagLabel = ref('')

let dictItemQuery = {
  dictCode: props.dictCode,
  enable: true
}

// interface ListItem {
//   value: string
//   label: string
// }

const tagType: any = ref('info')

getDictItemsApi(dictItemQuery as DictItemQuery).then((res) => {
  if (res) {
    const dictArr = res.data
    if (Array.isArray(dictArr)) {
      dictArr.forEach((element) => {
        if (element.code === valueRef.value) {
          tagLabel.value = element.label
          tagType.value = element.colorCode
        }
      })
    }
  }
})

// 监听, 必须添加，否则校验无法通过
watch(
  () => valueRef.value,
  (val: string) => {
    emit('update:modelValue', val)
  }
)
</script>
