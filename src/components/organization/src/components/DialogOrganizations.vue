<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-03-08 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\organization\src\components\DialogOrganizations.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('organizationVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

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
      <!-- <template #action="{ row }">
          <ElButton type="primary" @click="action(row, 'edit')">
            {{ t('tableDemo.action') }}
          </ElButton>
          <ElButton type="primary" @click="action(row, 'detail')">
            {{ t('tableDemo.action') }}
          </ElButton>
          <ElButton type="primary" @click="action(row, '')">
            {{ t('tableDemo.action') }}
          </ElButton>
        </template> -->
    </Table>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ElSwitch } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'
import { TableColumn } from '@/types/table'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'

import { useRouter } from 'vue-router'

import { ref, h, reactive, useAttrs, computed, watch } from 'vue'
import { ElButton } from 'element-plus'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { propTypes } from '@/utils/propTypes'

import { organizationType } from '@/system/organization/api/types'
import { addRoleOrganizationsApi } from '@/system/role/api'
import { getOrganizationListApi } from '@/system/organization/api'

const { push } = useRouter()
const { t } = useI18n()

interface Params {
  roleId?: number
  ids: number[]
}

let params: Params = {}

const { register, tableObject, methods } = useTable<organizationType>({
  getListApi: getOrganizationListApi,
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
    formatter: (row: organizationType) => {
      return h(ElSwitch, { value: row.enable, disabled: true })
    }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

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
