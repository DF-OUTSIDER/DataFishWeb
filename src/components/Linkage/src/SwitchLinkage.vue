<template>
  <ElSwitch v-model="valueRef" />
</template>

<script setup lang="ts">
import { ElSwitch } from 'element-plus'
import { PropType, ref, watch, unref } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { FormProps } from '@/api/common/type'

const props = defineProps({
  modelValue: propTypes.bool.def(false),
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
    if (val === unref(valueRef)) return
    valueRef.value = val
  }
)

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
