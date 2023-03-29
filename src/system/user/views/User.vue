<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\views\Authorization\User.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('userVo.title')" :message="t('userVo.message')">
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
        <ElButton type="primary" @click="action(row, 'detail')">
          {{ t('common.detail') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'role')">
          {{ t('action.role') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'org')">
          {{ t('action.organization') }}
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
      <UserRole v-if="actionType === 'role'" :userId="userId" />
      <UserOrganization v-if="actionType === 'org'" :userId="userId" />
    </ElDrawer>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'
import { TableColumn } from '@/types/table'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'
import { useRouter } from 'vue-router'

import { ref, h, reactive } from 'vue'
import { ElButton, ElSwitch, ElTag, ElDrawer } from 'element-plus'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { UserType } from '@/system/user/api/types'
import { getUserListApi, saveUserApi, deleteUserListApi } from '@/system/user/api'
import { UserRole, UserOrganization } from '@/components/user'

const { push } = useRouter()

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const { register, tableObject, methods } = useTable<UserType>({
  getListApi: getUserListApi,
  delListApi: deleteUserListApi,
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
    },
    formatter: (row: UserType) => {
      return h('span', { class: 'el-tag el-tag--light el-tooltip__trigger' }, row.username)
    }
  },
  {
    field: 'realname',
    label: t('userVo.realname'),
    search: {
      show: true
    }
  },
  // {
  //   field: 'encryptionType',
  //   label: t('userVo.encryptionType'),
  //   formatter: (row: UserType) => {
  //     switch (row.encryptionType) {
  //       case 0:
  //         return h('span', 'NONE')
  //       case 1:
  //         return h('span', 'MD5')
  //       case 2:
  //         return h('span', 'BCRYPT')
  //       default:
  //         return h('span', 'NONE')
  //     }
  //   }
  // },
  {
    field: 'encryptionTag',
    label: t('userVo.encryptionType'),
    formatter: (row: UserType) => {
      return h(
        ElTag,
        {
          type: row.encryptionTag.colorStyle
        },
        () => row.encryptionTag.label
      )
    }
  },
  {
    field: 'enable',
    label: t('roleVo.enable'),
    formatter: (row: UserType) => {
      return h(ElSwitch, { value: row.enable, disabled: true })
      // switch (row.enable) {
      //   case false:
      //     return h('span', '禁用')
      //   case true:
      //     return h('span', '启用')
      //   default:
      //     return h('span', '无效')
      // }
    }
  },
  {
    field: 'action',
    width: '360px',
    label: t('tableDemo.action')
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
const AddAction = () => {
  push('/system/user/user-add')
}

const delLoading = ref(false)

const delData = async (row: UserType | null, multiple: boolean) => {
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
const userId = ref(0)

const action = (row: UserType, type: string) => {
  switch (type) {
    case 'role':
      {
        // 显示用户对话框
        actionType.value = type
        dialogVisible.value = true

        userId.value = row.id
      }
      break
    case 'org':
      {
        // 显示用户对话框
        actionType.value = type
        dialogVisible.value = true

        userId.value = row.id
      }
      break
    case 'detail':
    case 'edit':
      {
        // 激活菜单
        push(`/system/user/user-${type}?id=${row.id}`)
      }
      break
    default:
      break
  }
}
</script>
