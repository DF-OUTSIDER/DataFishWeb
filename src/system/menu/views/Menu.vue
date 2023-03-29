<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-12
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\views\menu\Menu.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('menuVo.title')" :message="t('common.message')">
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
      rowKey="id"
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
        <ElButton type="primary" @click="action(row, 'permission')">
          {{ t('action.permission') }}
        </ElButton>
      </template>
    </Table>
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

import { ref, h, reactive } from 'vue'
import { ElButton, ElDrawer, ElSwitch } from 'element-plus'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { MenuPermission } from '@/components/permission'
import { getMenuApi, saveMenuApi, deleteMenuListApi } from '@/system/menu/api'

const { push } = useRouter()

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const { register, tableObject, methods } = useTable<AppCustomRouteRecordRaw>({
  getListApi: getMenuApi,
  delListApi: deleteMenuListApi,
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
    label: t('menuVo.index'),
    type: 'index'
  },
  {
    field: 'name',
    label: t('menuVo.menuname'),
    search: {
      show: true
    }
  },
  {
    field: 'component',
    label: t('menuVo.component'),
    search: {
      show: true
    }
  },
  {
    field: 'path',
    label: t('menuVo.path'),
    search: {
      show: true
    }
  },
  {
    field: 'enable',
    label: t('menuVo.enable'),
    formatter: (row: AppCustomRouteRecordRaw) => {
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
    field: 'sort',
    label: t('menuVo.sort'),
    search: {
      show: true
    }
  },
  // {
  //   field: 'redirect',
  //   label: t('menuVo.redirect'),
  //   search: {
  //     show: true
  //   }
  // },
  {
    field: 'action',
    label: t('tableDemo.action')
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const AddAction = () => {
  push('/system/menu/menu-add')
}

const delLoading = ref(false)

const delData = async (row: AppCustomRouteRecordRaw | null, multiple: boolean) => {
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

const isShowPermission = ref(false)

const menuId = ref(0)

const action = (row: AppCustomRouteRecordRaw, type: string) => {
  if (type === 'permission') {
    menuId.value = row.id
    isShowPermission.value = true
  } else {
    // 激活菜单
    push(`/system/menu/menu-${type}?id=${row.id}`)
  }
}
</script>
