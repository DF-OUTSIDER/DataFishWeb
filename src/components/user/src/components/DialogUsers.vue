<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \undefinedd:\publicProject\vue-element-plus-admin\src\components\user\src\components\DialogUsers.vue
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
import { ElDialog } from 'element-plus'
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

import { UserType } from '@/system/user/api/types'
import { getUserListApi } from '@/system/user/api'

const { push } = useRouter()

// const props = defineProps({
//   roleId: propTypes.number.def(0)
// })

interface Params {
  roleId?: number
  ids: number[]
}

let params: Params = {}

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

// const loading = ref(true)

// let tableDataList = ref<UserType[]>([])

// const getTableList = async (params?: Params) => {
//   const res = await getUserListApi({
//     params: params || {
//       pageIndex: 1,
//       pageSize: 10
//     }
//   }).finally(() => {
//     loading.value = false
//   })
//   if (res) {
//     tableDataList.value = res.data.list
//   }
// }

// getTableList()
//const AddAction = () => {
//push('/system/user-add')
//dialogTableVisible.value = true
//}

//const delLoading = ref(false)

// const delUserRoleData = async (row: UserType | null, multiple: boolean) => {
//   tableObject.currentRow = row
//   const { getSelections } = methods
//   const selections = await getSelections()
//   delLoading.value = true

// }
// params.ids = selections.map((v) => v.id)
// await removeUserRoleApi(params).finally(() => {
//   delLoading.value = false
//   getList()
// })

const getSelections = async () => {
  const { getSelections } = methods
  const selections = await getSelections()
  params.ids = selections.map((v) => v.id)
  return params
}

// const action = (row: UserType, type: string) => {
//   // 激活菜单
//   push(`/system/user-${type}?id=${row.id}`)
// }

defineExpose({
  getSelections
})
</script>
