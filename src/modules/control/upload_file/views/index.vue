<template>
  <ContentWrap title="文件配置" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton v-hasPermi="['file::insert']" type="primary" @click="action(null, 'create')">{{
        t('common.add')
      }}</ElButton>
      <ElButton
        v-hasPermi="['file::delete']"
        :loading="delLoading"
        type="danger"
        @click="action(null, 'delete')"
      >
        {{ t('common.del') }}
      </ElButton>
    </div>

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :selection="true"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #url="{ row }">
        <el-image v-if="row.type.indexOf('image') != -1" :src="row.url" lazy />
      </template>
      <template #action="{ row }">
        <ElButton v-hasPermi="['file::insert']" type="primary" @click="action(row, 'edit')">
          {{ t('common.edit') }}
        </ElButton>

        <ElButton type="primary" @click="action(row, 'detail')">
          {{ t('common.detail') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Form
      v-if="['create', 'edit'].includes(actionType)"
      ref="formRef"
      :schema="allSchemas.formSchema"
      :formProps="formProps"
      :initForm="initForm"
    />
    <Descriptions
      v-if="actionType === 'detail'"
      :schema="allSchemas.detailSchema"
      :data="currentRow || {}"
    />
    <template #footer>
      <ElButton
        type="primary"
        v-if="['create', 'edit'].includes(actionType)"
        @click="submitForm()"
        >{{ t('dialogDemo.submit') }}</ElButton
      >
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
/*
 * @Author: outsider
 * @Date: 2023-06-07
 * @Description:
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */
import { ref, onMounted, toRef, unref } from 'vue'
import { ElButton, ElMessage, ElImage } from 'element-plus'
//import { useRouter } from 'vue-router'

import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import i18n from '@/locales'

import { Table } from '@/components/Table'
import { Dialog } from '@/components/Dialog'
import { Form } from '@/components/Form'
import { Descriptions } from '@/components/Descriptions'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'

import { allSchemas, formProps, initForm } from '../data/UploadFile.data'

import {
  getUploadFileDetailApi,
  getUploadFileListApi,
  deleteUploadFileListApi,
  saveUploadFileApi
} from '@/modules/control/upload_file/api'
import { UploadFileType } from '@/modules/control/upload_file/api/types'

const { t } = i18n.global

//const { push } = useRouter()

const formRef = toRef(formProps, 'formExpose')
// 用于显示详细信息
const currentRow = ref<Nullable<UploadFileType>>(null)

const { register, tableObject, methods } = useTable<UploadFileType>({
  getListApi: getUploadFileListApi,
  delListApi: deleteUploadFileListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList, setSearchParams } = methods

// 对话框相关
const dialogTitle = ref('edit') // 弹出层标题
const dialogVisible = ref(false)
const delLoading = ref(false)
const actionType = ref('') // 操作按钮的类型

// 设置标题
const setDialogTile = (type: string, visible: boolean) => {
  dialogTitle.value = t('action.' + type)
  actionType.value = type
  if (['create', 'edit'].includes(type)) {
    formProps.actionType = type
  } else {
    formProps.actionType = ''
  }

  dialogVisible.value = visible
}

// 修改操作
const editAction = async (rowId: number) => {
  setDialogTile('edit', true)
  // 设置数据
  const res = await getUploadFileDetailApi(rowId)
  //await nextTick()
  if (res.data) {
    unref(formRef)?.setValues(res.data)
  }
}

// 详细信息
const detailAction = async (rowId: number) => {
  setDialogTile('detail', true)
  // 设置数据
  const res = await getUploadFileDetailApi(rowId)
  if (res.data) {
    currentRow.value = res.data
  }
}

// 删除
const deleteAction = async (multiple: boolean) => {
  setDialogTile('delete', false)

  const { delList, getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true
  await delList(
    multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as unknown as string],
    multiple
  ).finally(() => {
    delLoading.value = false
  })
}

// 操作列
const action = (row: UploadFileType | null, type: string) => {
  switch (type) {
    case 'create':
      setDialogTile(type, true)
      break
    case 'edit':
      if (row) {
        editAction(row.id)
      }
      break
    case 'detail':
      if (row) {
        detailAction(row.id)
      }
      break
    case 'delete':
      deleteAction(true)
      break
    default:
      break
  }
}

// 提交新增/修改的表单
const submitForm = async () => {
  const elForm = unref(formRef)?.getElFormRef()
  if (!elForm) return
  elForm.validate(async (valid) => {
    if (valid) {
      // 提交请求
      try {
        const data = unref(formRef)?.formModel as UploadFileType
        if (actionType.value === 'create') {
          await saveUploadFileApi(data)
          ElMessage.success(t('common.createSuccess'))
        } else if (actionType.value === 'edit') {
          await saveUploadFileApi(data)
          ElMessage.success(t('common.editSuccess'))
        }
        dialogVisible.value = false
      } finally {
        await getList()
      }
    }
  })
}

// ### 初始化
onMounted(async () => {
  await getList()
})

// 暴露子组件可调用方法
useEmitt({
  name: 'getList',
  callback: (type: string) => {
    if (type === 'add') {
      tableObject.currentPage = 1
    }
    getList()
  }
})
</script>
