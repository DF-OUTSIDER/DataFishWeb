<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-29 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\monitor\log\views\Logger.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('loggerVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
        {{ t('exampleDemo.del') }}
      </ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
        {{ t('common.empty') }}
      </ElButton>
    </div>

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :selection="true"
      rowKey="createTime"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #action="{ row }">
        <ElButton type="primary" @click="action(row, 'detail')">
          {{ t('common.detail') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'

import { ref } from 'vue'
import { ElButton } from 'element-plus'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'
import { useRouter } from 'vue-router'

import { allSchemas } from '../data/Logger.data'

import { LoggerType } from '@/modules/monitor/log/api/types'
import { getLoggerListApi, deleteLoggerListApi } from '@/modules/monitor/log/api'

const { push } = useRouter()

const { t } = useI18n()

const { register, tableObject, methods } = useTable<LoggerType>({
  getListApi: getLoggerListApi,
  delListApi: deleteLoggerListApi,
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

const delLoading = ref(false)
const delData = async (row: LoggerType | null, multiple: boolean) => {
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

const action = (row: LoggerType, type: string) => {
  switch (type) {
    case 'detail':
      {
        // todo 显示详细信息
        push(`/monitor/log/log-${type}?id=${row.id}`)
      }
      break

    default:
      break
  }
}
</script>
