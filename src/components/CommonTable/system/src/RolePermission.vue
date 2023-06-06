<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\CommonTable\system\src\RolePermission.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('permissionVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton :loading="updateLoading" type="primary" @click="updatePermissions(null, true)">{{
        t('permission.update')
      }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delPremissions(null, true)">
        {{ t('permission.remove') }}
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
        <ElButton type="primary" @click="customPermission(row)">
          {{ t('permission.custom') }}
        </ElButton>
      </template>
    </Table> </ContentWrap
  ><!-- <slot name="title">
          {{ title }}
        </slot> -->
  <ElDialog
    title="角色权限"
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
        <Icon
          v-if="fullscreen"
          class="mr-18px cursor-pointer is-hover mt-2px z-10"
          :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
          color="var(--el-color-info)"
          @click="toggleFull"
        />
      </div>
    </template>
    <PermissionDialog ref="dialogPermission" :roleId="roleId" :menu-id="menuId" />
    <template #footer>
      <ElButton type="primary" @click="editPermission()">{{ t('dialogDemo.submit') }}</ElButton>
      <ElButton @click="closeDialog()">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'

import { useTable } from '@/hooks/web/useTable'
import { PermissionType } from '@/api/permission/types'
import { useEmitt } from '@/hooks/web/useEmitt'

import { useRouter } from 'vue-router'

import { ref, h, reactive, useAttrs, computed, watch, unref } from 'vue'
import { ElButton } from 'element-plus'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { propTypes } from '@/utils/propTypes'
import { PermissionDialog } from '@/components/CommonDialog/role'

import {
  getRolePermissionListApi,
  updateRolePermissionListApi,
  removeRolePermissionListApi,
  updateRolePermissionApi
} from '@/modules/system/role/api'

const props = defineProps({
  roleId: propTypes.number.def(0)
})
const menuId = ref(0)

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

const dialogPermission = ref<ComponentRef<typeof PermissionDialog>>()

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen)
}

const roleId = ref(props.roleId)

interface Params {
  id?: number
  menuIds: number[]
}

interface RolePageQuery {
  id?: number
  permission?: PermissionType
}

const { t } = useI18n()

const { register, tableObject, methods } = useTable<PermissionType>({
  getListApi: getRolePermissionListApi,
  //delListApi: removeUserRoleApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

//tableObject.params.roleid = roleId.value
let params: Params = {}
params.id = roleId.value
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
    label: t('permissionVo.index'),
    type: 'index'
  },
  {
    field: 'name',
    label: t('permissionVo.name')
  },
  {
    field: 'codes',
    label: t('permissionVo.codes'),
    formatter: (row: PermissionType) => {
      if (row.codes) {
        return h('span', { class: 'el-tag el-tag--light el-tooltip__trigger' }, row.codes)
      }
      return h('span', { class: 'el-tag el-tag--danger el-tooltip__trigger' }, '无权限')
    }
  },
  {
    field: 'action',
    label: t('tableDemo.action')
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const updateLoading = ref(false)

const updatePermissions = async (row: PermissionType | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { getSelections } = methods
  const selections = await getSelections()
  updateLoading.value = true
  params.menuIds = selections.map((v) => v.id)
  await updateRolePermissionListApi(params).finally(() => {
    updateLoading.value = false
    getList()
  })
}

const delLoading = ref(false)

const delPremissions = async (row: PermissionType | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true
  params.menuIds = selections.map((v) => v.id)
  await removeRolePermissionListApi(params).finally(() => {
    delLoading.value = false
    getList()
  })
}

const customPermission = (row: UserType) => {
  // 激活菜单
  //push(`/system/user-${type}?id=${row.id}`)
  menuId.value = row.id
  dialogTableVisible.value = true
}

const editPermission = async () => {
  let _params: RolePageQuery = {}
  _params.permission = (await dialogPermission.value.getPermissionData()) as PermissionType
  _params.id = roleId.value
  // 删除 子集，提升性能
  delete _params.children
  //delete _params.authPreName
  await updateRolePermissionApi(_params).finally(() => {
    getList()
    dialogTableVisible.value = false
  })
}

const closeDialog = () => {
  dialogTableVisible.value = false
}
</script>
