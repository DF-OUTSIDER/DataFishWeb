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
    {{ tagLabel }}
  </ElTag>
</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { ElMessage, ElTag } from 'element-plus'
import { PropType, ref, watch, onMounted } from 'vue'

import { useDictStoreWithOut } from '@/store/modules/dict'

// 字典存储
const dictStore = useDictStoreWithOut()

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

const tagType: any = ref('info')

// 监听, 必须添加，否则校验无法通过
watch(
  () => valueRef.value,
  (val: string) => {
    emit('update:modelValue', val)
  }
)

onMounted(async () => {
  // 先查字典
  let dictItems = dictStore.getDictItems[dictItemQuery.dictCode]
  if (!dictItems) {
    dictItems = await dictStore.initDict(dictItemQuery.dictCode)
    // dictItems = dictStore.getDictItems[dictItemQuery.dictCode]
  }
  if (Array.isArray(dictItems)) {
    dictItems.forEach((element) => {
      if (element.code === valueRef.value) {
        tagLabel.value = element.label
        tagType.value = element.colorTag.colorStyle
        return
      }
    })
  } else {
    ElMessage.error('字典获取失败！')
  }
})
</script>
