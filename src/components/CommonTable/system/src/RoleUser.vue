<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\CommonTable\system\src\RoleUser.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('userVo.title')" :message="t('userVo.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="addAction">{{ t('common.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delUserRoleData(null, true)">
        {{ t('common.remove') }}
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
          {{ t('tableDemo.action') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'detail')">
          {{ t('tableDemo.action') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, '')">
          {{ t('tableDemo.action') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
  <ElDialog
    v-model="dialogTableVisible"
    v-bind="getBindValue"
    :fullscreen="isFullscreen"
    destroy-on-close
    lock-scroll
    draggable
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="flex justify-between">
        <slot name="title">
          {{ title }}
        </slot>
        <Icon
          v-if="fullscreen"
          class="mr-18px cursor-pointer is-hover mt-2px z-10"
          :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
          color="var(--el-color-info)"
          @click="toggleFull"
        />
      </div>
    </template>
    <UserDialog ref="dialogUsers" />
    <template #footer>
      <ElButton type="primary" @click="addRoleUser()">{{ t('dialogDemo.submit') }}</ElButton>
      <ElButton @click="closeDialog()">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElTag } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'

import { useTable } from '@/hooks/web/useTable'
import { UserType } from '@/modules/system/user/api/types'
import { useEmitt } from '@/hooks/web/useEmitt'

import { useRouter } from 'vue-router'

import { getUserRoleListApi, addRoleUsersApi, removeUserRoleApi } from '@/modules/system/user/api'

import { ref, reactive, useAttrs, computed, watch } from 'vue'
import { ElButton } from 'element-plus'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { propTypes } from '@/utils/propTypes'
import { UserDialog } from '@/components/CommonDialog/user'

const { push } = useRouter()

const props = defineProps({
  roleId: propTypes.number.def(0)
})

const getBindValue = computed(() => {
  const delArr: string[] = ['fullscreen', 'title', 'maxHeight']
  const attrs = useAttrs()
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
})

const fullscreen = ref(true)
const isFullscreen = ref(false)
const dialogTableVisible = ref(false)

const dialogUsers = ref()

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen)
}

const roleId = ref(props.roleId)

interface Params {
  roleId?: number
  ids: number[]
}

const { t } = useI18n()

const { register, tableObject, methods } = useTable<UserType>({
  getListApi: getUserRoleListApi,
  //delListApi: removeUserRoleApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

//tableObject.params.roleid = roleId.value
let params: Params = {}
params.roleId = roleId.value
tableObject.params = params

const { getList, setSearchParams } = methods

watch(
  () => roleId,
  (newValue, oldValue) => {
    getList()
  },
  {
    immediate: true
  }
)

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
    field: 'user.username',
    label: t('userVo.username'),
    search: {
      show: true
    }
  },
  {
    field: 'user.realname',
    label: t('userVo.realname')
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
const addAction = () => {
  //push('/system/user-add')
  dialogTableVisible.value = true
}

const delLoading = ref(false)

const delUserRoleData = async (row: UserType | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true
  params.ids = selections.map((v) => v.id)
  await removeUserRoleApi(params).finally(() => {
    delLoading.value = false
    getList()
  })
}

const action = (row: UserType, type: string) => {
  // 激活菜单
  push(`/system/user/user-${type}?id=${row.id}`)
}

const addRoleUser = async () => {
  let _params = await dialogUsers.value.getSelections()
  _params.roleId = roleId.value
  await addRoleUsersApi(_params).finally(() => {
    getList()
    dialogTableVisible.value = false
  })
}

const closeDialog = () => {
  dialogTableVisible.value = false
}
</script>
