<template>
  <ContentWrap :title="文件配置" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton v-hasPermi="['file::insert']" type="primary" @click="action(null, 'create')">{{
        t('common.add')
      }}</ElButton>
      <ElButton
        v-hasPermi="['file::delete']"
        :loading="delLoading"
        type="danger"
        @click="delData(null, true)"
      >
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
        <ElButton v-hasPermi="['file::insert']" type="primary" @click="action(row, 'edit')">
          {{ t('common.edit') }}
        </ElButton>

        <ElButton type="primary" @click="action(row, 'detail')">
          {{ t('common.detail') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>

<script setup lang="ts">
/*
 * @Author: outsider
 * @Date: 2023-06-07
 * @Description:
 * Copyright (c) 2023 by outsider, All Rights Reserved.
 */
import { ref } from 'vue'
import { ElButton, ElDrawer } from 'element-plus'
import { useRouter } from 'vue-router'

import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import i18n from '@/locales'

import { Table } from '@/components/Table'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'

import { crudSchemas } from '../data/UploadFile.data'
import { useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { getUploadFileListApi, deleteUploadFileListApi } from '@/modules/control/file/api'
import { UploadFileType } from '@/modules/control/file/api/types'

const { t } = useI18n()

const { push } = useRouter()

const { register, tableObject, methods } = useTable<DictType>({
  getListApi: getUploadFileListApi,
  delListApi: deleteUploadFileListApi,
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

const delData = async (row: UploadFileType | null, multiple: boolean) => {
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
const action = (row: UploadFileType, type: string) => {
  switch (type) {
    case 'create':
      {
        // 激活菜单
      }
      break
    case 'edit':
      {
        // 激活菜单
      }
      break
    case 'detail':
      {
        // 显示详细
      }
      break
    default:
      break
  }
}

// ### 初始化
onMounted(async () => {
  await getList()
})

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
