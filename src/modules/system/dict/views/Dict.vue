<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-31 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\dict\views\Dict.vue
 * @Description: 
 *
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('dictVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton v-hasPermi="['dict::insert']" type="primary" @click="AddAction">{{
        t('common.add')
      }}</ElButton>
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
      v-model="drawerVisible"
      direction="rtl"
      :destroy-on-close="true"
      size="800px"
      :z-index="1000"
    >
      <DictItemTable :dictId="dictId" />
    </ElDrawer>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElDrawer } from 'element-plus'
import { useRouter } from 'vue-router'

import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'

import { crudSchemas } from '../data/Dict.data'
import { useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { getDictListApi, deleteDictListApi } from '@/modules/system/dict/api'
import { DictType } from '@/modules/system/dict/api/types'

import { DictItemTable } from '@/components/CommonTable/dict'

const { t } = useI18n()

const { push } = useRouter()

const { register, tableObject, methods } = useTable<DictType>({
  getListApi: getDictListApi,
  delListApi: deleteDictListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList, setSearchParams } = methods
const { allSchemas } = useCrudSchemas(crudSchemas)

// 显示字典明细配置
const drawerVisible = ref(false)
const dictId = ref(0)

const delLoading = ref(false)

getList()

// 新增按钮弹出页面
const AddAction = () => {
  push('/system/dict/dict-add')
}

const delData = async (row: DictType | null, multiple: boolean) => {
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

// 操作列
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
        drawerVisible.value = true
        dictId.value = row.id
      }
      break
    default:
      break
  }
}

// 暴露子组件可调用方法
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
