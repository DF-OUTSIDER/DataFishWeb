<template>
  <ElInput v-model="valueRef" style="width: 189.5px" size="default" />
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import { PropType, ref, onBeforeMount, watch, unref } from 'vue'
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  modelValue: propTypes.string.def(''),
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
