<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-29
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\permission\src\MenuPermission.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
 * ElDialog z-index 太大会导致select选择项不正常显示。
-->
<template>
  <ContentWrap :title="t('permissionVo.title')" :message="t('userVo.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
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
    :z-index="100"
  >
    <template #header>
      <div class="flex justify-between">
        <slot name="title"> {{ t('permissionVo.title') }} </slot>
        <Icon
          v-if="fullscreen"
          class="mr-18px cursor-pointer is-hover mt-2px z-10"
          :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
          color="var(--el-color-info)"
          @click="toggleFull"
        />
      </div>
    </template>
    <PermissionAdd :menuId="menuId" :closeDialog="closeDialog" ref="permissionAdd" />
    <template #footer>
      <ElButton type="primary" @click="addPermission()">{{ t('dialogDemo.submit') }}</ElButton>
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
import { TableColumn } from '@/types/table'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'

import { useRouter } from 'vue-router'

import { ref, unref, h, reactive, useAttrs, computed, watch } from 'vue'
import { ElButton } from 'element-plus'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { propTypes } from '@/utils/propTypes'

import { MenuPermission } from '@/api/permission/types'

import {
  getAuthorityListApi,
  saveAuthorityApi,
  deleteAuthorityListApi
} from '@/modules/system/permission/api'

import { PermissionAdd } from '@/components/permission/src/components'

const { push } = useRouter()

const props = defineProps({
  menuId: propTypes.number.def(0)
})

const { t } = useI18n()

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

const permissionAdd = ref()

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen)
}

interface Params {
  menuId?: number
  ids: number[]
}

const { register, tableObject, methods } = useTable<MenuPermission>({
  getListApi: getAuthorityListApi,
  delListApi: deleteAuthorityListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const menuId = ref(props.menuId)
let params: Params = {}
params.menuId = menuId.value
//params.ids = []
tableObject.params = params

const { getList, setSearchParams } = methods

watch(
  () => menuId,
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
    label: t('permissionVo.name'),
    search: {
      show: true
    }
  },
  {
    field: 'code',
    label: t('permissionVo.code')
  },
  {
    field: 'enable',
    label: t('permissionVo.enable'),
    formatter: (row: MenuPermission) => {
      switch (row.enable) {
        case false:
          return h('span', '禁用')
        case true:
          return h('span', '启用')
        default:
          return h('span', '无效')
      }
    }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const delLoading = ref(false)

const AddAction = () => {
  dialogTableVisible.value = true
}

const addPermission = async () => {
  await permissionAdd.value.save().finally(() => {
    //dialogTableVisible.value = false
    getList()
  })
}

const closeDialog = () => {
  dialogTableVisible.value = false
}

const delData = async (row: MenuPermission | null, multiple: boolean) => {
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
</script>
