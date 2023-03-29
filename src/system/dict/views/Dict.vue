<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-31 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\views\dict\Dict.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('dictVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('common.add') }}</ElButton>
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
      @register="register"
    >
      <template #action="{ row }">
        <ElButton type="primary" @click="action(row, 'edit')">
          {{ t('common.edit') }}
        </ElButton>
        <!-- 
        <ElButton type="primary" @click="action(row, 'detail')">
          {{ t('common.detail') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'role')">
          {{ t('action.role') }}
        </ElButton> -->
        <ElButton type="primary" @click="action(row, 'dictConfig')">
          {{ t('action.dictConfig') }}
        </ElButton>
      </template>
    </Table>
    <ElDrawer
      v-model="isShowDictItems"
      direction="rtl"
      :destroy-on-close="true"
      size="800px"
      :z-index="1000"
    >
      <DictItem :dictId="dictId" />
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
import { ElButton, ElDrawer, ElSwitch } from 'element-plus'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { getDictListApi, deleteDictListApi } from '@/system/dict/api'
import { DictType } from '@/system/dict/api/types'

import { DictItem } from '@/components/dict'

const { push } = useRouter()

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const { register, tableObject, methods } = useTable<DictType>({
  getListApi: getDictListApi,
  delListApi: deleteDictListApi,
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
    label: t('dictVo.index'),
    type: 'index'
  },
  {
    field: 'name',
    label: t('dictVo.name')
  },
  {
    field: 'code',
    label: t('dictVo.code')
  },
  {
    field: 'enable',
    label: t('dictVo.enable'),
    formatter: (row: DictType) => {
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

const AddAction = () => {
  push('/system/dict/dict-add')
}

const delLoading = ref(false)

const delData = async (row: DictType | null, multiple: boolean) => {
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

const dictId = ref(0)

// 显示字典明细配置
const isShowDictItems = ref(false)

const action = (row: DictType, type: string) => {
  switch (type) {
    case 'edit':
      {
        // 激活菜单
        push(`/system/dict/dict-${type}?id=${row.id}`)
      }
      break
    case 'dictConfig':
      {
        // 显示用户对话框
        isShowDictItems.value = true
        dictId.value = row.id
      }
      break
    default:
      break
  }
}
</script>
