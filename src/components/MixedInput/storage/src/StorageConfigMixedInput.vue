<template>
  <ElInputNumber disabled v-model="valueRef" style="display: none" />
  <ElInput disabled v-model="name">
    <template #append>
      <el-button :icon="Search" @click="showDialog()" />
    </template>
  </ElInput>
  <!-- 设备弹窗 -->
  <Dialog v-model="dialogVisible" title="设备信息" width="60%">
    <!-- 数据表 -->
    <StorageConfigTable ref="tableRef" />
    <template #footer>
      <!-- 按钮：保存 -->
      <ElButton type="primary" @click="choose()">{{ t('dialogDemo.submit') }}</ElButton>
      <!-- 按钮：关闭 -->
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { ElButton, ElInputNumber, ElInput, ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { Dialog } from '@/components/Dialog'

import { StorageConfigTable } from '@/components/CommonTable/storage'
import { PropType, ref, unref, watch } from 'vue'
import i18n from '@/locales'

import {
  getStorageConfigDetailApi,
  getStorageConfigListApi,
  deleteStorageConfigListApi,
  saveStorageConfigApi
} from '@/modules/control/storage/api'
import { StorageConfigType } from '@/modules/control/storage/api/types'
import { number } from 'vue-types'

const { t } = i18n.global

const props = defineProps({
  modelValue: {
    type: Number as PropType<number>,
    default: 0
  }
})

const tableRef = ref<ComponentRef<typeof StorageConfigTable>>()
const name = ref('')
// 输入框的值
const valueRef = ref(props.modelValue)

const dialogVisible = ref(false) // 是否显示弹出层
// const modelLoading = ref(false) // 弹出层loading

watch(
  () => props.modelValue,
  (val: number) => {
    if (val === unref(valueRef)) return
    valueRef.value = val
  }
)

const setName = async (value: number) => {
  if (value) {
    const res = (await getStorageConfigDetailApi(value)) as unknown as StorageConfigType
    if (res) {
      name.value = res?.data?.name
    }
  }
}

const emit = defineEmits(['update:modelValue'])

// 监听
watch(
  () => valueRef.value,
  (val: number) => {
    if (val != 0) {
      setName(val)
    }
    emit('update:modelValue', val)
  }
)

// 显示对话框
const showDialog = () => {
  dialogVisible.value = true
}

// 选择设备
const choose = async () => {
  const data = (await unref(tableRef)?.getCurrentRow()) as unknown as StorageConfigType
  //ElMessage.info(row.code)
  //   const data = (await unref(tableRef)?()) as unknown as ProcessApi.ProcessVO
  valueRef.value = data?.id
  dialogVisible.value = false
}
</script>
