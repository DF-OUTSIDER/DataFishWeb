<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-12
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\menu\views\Menu.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('menuVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton v-hasPermi="['menu::insert']" type="primary" @click="action(null, 'create')">{{
        t('exampleDemo.add')
      }}</ElButton>
      <ElButton
        v-hasPermi="['menu::delete']"
        :loading="delLoading"
        type="danger"
        @click="action(null, 'delete')"
      >
        {{ t('exampleDemo.del') }}
      </ElButton>
    </div>

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :selection="true"
      rowKey="id"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #action="{ row }">
        <ElButton type="primary" v-hasPermi="['menu::insert']" @click="action(row, 'edit')">
          {{ t('common.edit') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'detail')">
          {{ t('common.detail') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'permission')">
          {{ t('action.permission') }}
        </ElButton>
      </template>
    </Table>
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
        :data="detailVo || {}"
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
    <ElDrawer
      v-model="isShowPermission"
      direction="rtl"
      :destroy-on-close="true"
      size="800px"
      :z-index="1000"
    >
      <MenuPermission :menuId="menuId" />
    </ElDrawer>
  </ContentWrap>
</template>

<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'
import { TableColumn } from '@/types/table'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'
import { useRouter } from 'vue-router'

import { ref, h, reactive, onMounted, unref, toRef } from 'vue'
import { ElButton, ElDrawer, ElMessage, ElSwitch } from 'element-plus'

import { MenuPermission } from '@/components/permission'
import {
  getMenuApi,
  deleteMenuListApi,
  getMenuDetailApi,
  saveMenuApi
} from '@/modules/system/menu/api'

import { Dialog } from '@/components/Dialog'
import { Form } from '@/components/Form'
import { Descriptions } from '@/components/Descriptions'

import { allSchemas, formProps, initForm } from '../data/Menu.data'

const { push } = useRouter()

const { t } = useI18n()

const formRef = toRef(formProps, 'formExpose')
// 用于显示详细信息
const detailVo = ref<Nullable<AppCustomRouteRecordRaw>>(null)

const { register, tableObject, methods } = useTable<AppCustomRouteRecordRaw>({
  getListApi: getMenuApi,
  delListApi: deleteMenuListApi,
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

// const AddAction = () => {
//   push('/system/menu/menu-add')
// }

// const delData = async (row: AppCustomRouteRecordRaw | null, multiple: boolean) => {
//   tableObject.currentRow = row
//   const { delList, getSelections } = methods
//   const selections = await getSelections()
//   delLoading.value = true
//   await delList(
//     multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as unknown as string],
//     multiple
//   ).finally(() => {
//     delLoading.value = false
//   })
// }

const isShowPermission = ref(false)

const menuId = ref(0)

// 修改操作
const editAction = async (rowId: number) => {
  setDialogTile('edit', true)
  // 设置数据
  const res = await getMenuDetailApi(rowId)
  //await nextTick()
  if (res.data) {
    unref(formRef)?.setValues(res.data)
  }
}

// 详细信息
const detailAction = async (rowId: number) => {
  setDialogTile('detail', true)
  // 设置数据
  const res = await getMenuDetailApi(rowId)
  if (res.data) {
    detailVo.value = res.data
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

// const action = (row: AppCustomRouteRecordRaw, type: string) => {
//   if (type === '') {
//   } else {
//     // 激活菜单
//     push(`/system/menu/menu-${type}?id=${row.id}`)
//   }
// }

// 操作列
const action = (row: AppCustomRouteRecordRaw | null, type: string) => {
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
        //detailAction(row.id)
        // 激活菜单
        push(`/system/menu/menu-${type}?id=${row.id}`)
      }
      break
    case 'delete':
      deleteAction(true)
      break
    case 'permission':
      if (row) {
        menuId.value = row?.id
        isShowPermission.value = true
      }
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
        const data = unref(formRef)?.formModel as StorageConfigType
        if (actionType.value === 'create') {
          await saveMenuApi(data)
          ElMessage.success(t('common.createSuccess'))
        } else if (actionType.value === 'edit') {
          await saveMenuApi(data)
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

// 暴露子组件可调用的方法
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
