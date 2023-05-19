<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-12 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\organization\views\Organization.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('organizationVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="addAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
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
      rowKey="id"
      @register="register"
    >
      <template #action="{ row }">
        <ElButton type="primary" @click="action(row, 'edit')">
          {{ t('common.edit') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'user')">
          {{ t('action.user') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'role')">
          {{ t('action.role') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'diagram')">
          {{ t('action.diagram') }}
        </ElButton>
      </template>
    </Table>
    <ElDrawer
      v-model="dialogVisible"
      direction="rtl"
      :destroy-on-close="true"
      size="800px"
      :z-index="1000"
    >
      <OrganizationUser v-if="actionType === 'user'" :organizationId="organizationId" />
      <OrganizationRole v-if="actionType === 'role'" :organizationId="organizationId" />
      <OrganizationTree v-if="actionType === 'diagram'" :organizationId="organizationId" />
    </ElDrawer>
  </ContentWrap>
</template>

<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'
import { useRouter } from 'vue-router'

import { ref } from 'vue'
import { ElButton, ElDrawer } from 'element-plus'

import { useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { crudSchemas } from '../data/Organization.data'
import {
  deleteOrganizationListApi,
  getOrganizationListApi
} from '@/modules/system/organization/api'
import { organizationType } from '@/modules/system/organization/api/types'
import { OrganizationUser, OrganizationRole } from '@/components/CommonTable/system'
import { OrganizationTree } from '@/components/Diagram/organization'

const { push } = useRouter()

const { t } = useI18n()

const { register, tableObject, methods } = useTable<organizationType>({
  getListApi: getOrganizationListApi,
  delListApi: deleteOrganizationListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList, setSearchParams } = methods

const { allSchemas } = useCrudSchemas(crudSchemas)

const actionType = ref('')
const dialogVisible = ref(false)

const organizationId = ref(0)
const delLoading = ref(false)

const addAction = () => {
  push('/system/organization/organization-add')
}

getList()

const delData = async (row: organizationType | null, multiple: boolean) => {
  tableObject.currentRow = row
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

const action = (row: organizationType, type: string) => {
  switch (type) {
    case 'user':
      {
        // 显示用户对话框
        actionType.value = type
        dialogVisible.value = true
        organizationId.value = row.id
      }
      break
    case 'role':
      {
        actionType.value = type
        dialogVisible.value = true
        organizationId.value = row.id
      }
      break
    case 'diagram':
      {
        actionType.value = type
        dialogVisible.value = true
        organizationId.value = row.id
      }
      break
    case 'detail':
    case 'edit':
      {
        // 激活菜单
        push(`/system/organization/organization-${type}?id=${row.id}`)
      }
      break
    default:
      break
  }
}

// 定义调用方法
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
