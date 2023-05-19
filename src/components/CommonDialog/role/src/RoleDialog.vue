<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-03-10
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\CommonDialog\role\src\RoleDialog.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('roleVo.title')" :message="t('userVo.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
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
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #action="{ row }">
        <ElButton type="primary" @click="action(row, 'edit')">
          {{ t('common.edit') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'user')">
          {{ t('action.user') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'org')">
          {{ t('action.organization') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'permission')">
          {{ t('action.permission') }}
        </ElButton>
      </template>
    </Table>

    <ElDrawer
      v-model="dialogVisible"
      direction="rtl"
      :destroy-on-close="true"
      size="800px"
      :z-index="4000"
    >
      <RoleUser v-if="actionType === 'user'" :roleId="roleId" />
      <RolePermission v-if="actionType === 'permission'" :roleId="roleId" />
      <RoleOrganization v-if="actionType === 'org'" :roleId="roleId" />
    </ElDrawer>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'

import { ref, h, reactive } from 'vue'
import { ElButton, ElDrawer, ElSwitch } from 'element-plus'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'
import { useRouter } from 'vue-router'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { RoleType } from '@/modules/system/role/api/types'
import { getRoleListApi, deleteRoleListApi } from '@/modules/system/role/api'
import { RoleUser, RolePermission, RoleOrganization } from '@/components/CommonTable/system'

const { push } = useRouter()
const { t } = useI18n()

interface Params {
  ids: number[]
}

let params: Params = {}

const { register, tableObject, methods } = useTable<RoleType>({
  getListApi: getRoleListApi,
  delListApi: deleteRoleListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList, setSearchParams } = methods

getList()

useEmitt({
  name: 'getList',
  callback: (type: string) => {
    if (type === 'add') {
      tableObject.currentPage = 1
    }
    getList()
  }
})

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('roleVo.index'),
    type: 'index'
  },
  {
    field: 'name',
    label: t('roleVo.name'),
    search: {
      show: true
    }
  },
  {
    field: 'code',
    label: t('roleVo.code')
  },
  {
    field: 'enable',
    label: t('roleVo.enable'),
    formatter: (row: RoleType) => {
      return h(ElSwitch, { modelValue: row.enable, disabled: true })
      // switch (row.enable) {
      //   case false:
      //     return h('span', '禁用')
      //   case true:
      //     return h('span', '启用')
      //   default:
      //     return h('span', '无效')
      // }
    }
  }
  //   ,
  //   {
  //     field: 'action',
  //     width: 300,
  //     label: t('tableDemo.action')
  //   }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const AddAction = () => {
  push('/system/role/role-add')
}

const delLoading = ref(false)
const delData = async (row: RoleType | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true
  await delList(
    multiple ? selections.map((v) => v.id) : [tableObject.currentRow?.id as string],
    multiple
  ).finally(() => {
    delLoading.value = false
  })
}

const actionType = ref('')
const dialogVisible = ref(false)

const roleId = ref(0)

const action = (row: RoleType, type: string) => {
  switch (type) {
    case 'user':
      {
        // 显示用户对话框
        actionType.value = type
        dialogVisible.value = true

        roleId.value = row.id
      }
      break
    case 'permission':
      {
        // 显示用户对话框
        actionType.value = type
        dialogVisible.value = true

        roleId.value = row.id
      }
      break
    case 'org':
      {
        // 显示用户对话框
        actionType.value = type
        dialogVisible.value = true

        roleId.value = row.id
      }
      break
    case 'edit':
      {
        // 激活菜单
        push(`/system/role/role-${type}?id=${row.id}`)
      }
      break
    default:
      break
  }
}

const getSelections = async () => {
  const { getSelections } = methods
  const selections = await getSelections()
  params.ids = selections.map((v) => v.id)
  return params
}

defineExpose({
  getSelections
})
</script>
