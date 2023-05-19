<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\CommonDialog\user\src\UserDialog.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('userVo.title')" :message="t('userVo.message')">
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
      @register="register"
    />
  </ContentWrap>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'

import { useEmitt } from '@/hooks/web/useEmitt'

// import { ElButton } from 'element-plus'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { UserType } from '@/modules/system/user/api/types'
import { getUserListApi } from '@/modules/system/user/api'

interface Params {
  roleId?: number
  ids: number[]
}

const { t } = useI18n()

const { register, tableObject, methods } = useTable<UserType>({
  getListApi: getUserListApi,
  //delListApi: removeUserRoleApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList, setSearchParams } = methods

let params: Params = { roleId: 0, ids: [] }

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
    label: t('userVo.index'),
    type: 'index'
  },
  {
    field: 'username',
    label: t('userVo.username'),
    search: {
      show: true
    }
  },
  {
    field: 'realname',
    label: t('userVo.realname')
  },
  {
    field: 'encryptionType',
    label: t('userVo.encryptionType'),
    formatter: (row: UserType) => {
      switch (row.encryptionType) {
        case 0:
          return h('span', 'NONE')
        case 1:
          return h('span', 'MD5')
        case 2:
          return h('span', 'BCRYPT')
        default:
          return h('span', 'NONE')
      }
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
