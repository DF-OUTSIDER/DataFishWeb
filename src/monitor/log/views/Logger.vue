<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-29 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\monitor\log\views\Logger.vue
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
    <!-- <ElDrawer
      v-model="isShowUser"
      direction="rtl"
      :destroy-on-close="true"
      size="800px"
      :z-index="4000"
    >
      <RoleUser :roleId="roleId" />
    </ElDrawer> -->
  </ContentWrap>
</template>

<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { TableColumn } from '@/types/table'

import { ref, h, reactive } from 'vue'
import { ElButton, ElDrawer, ElTag } from 'element-plus'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'
import { useRouter } from 'vue-router'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { LoggerType } from '@/monitor/log/api/types'
import { getLoggerListApi, deleteLoggerListApi } from '@/monitor/log/api'

const { push } = useRouter()

interface Params {
  pageIndex?: number
  pageSize?: number
}

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

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'line',
    label: t('loggerVo.index'),
    type: 'index'
  },
  // {
  //   field: 'level',
  //   label: t('loggerVo.level'),
  //   formatter: (row: LoggerType) => {
  //     return h(
  //       ElTag,
  //       {
  //         type: row.level == 'INFO' ? 'success' : row.level == 'ERROR' ? 'danger' : 'warning'
  //       },
  //       () =>
  //         row.level == 'INFO'
  //           ? t('common.info')
  //           : row.level == 'ERROR'
  //           ? t('common.error')
  //           : t('common.warning')
  //     )
  //   },
  //   search: {
  //     show: true
  //   }
  // },
  {
    field: 'levelTag',
    label: t('loggerVo.level'),
    width: '100px',
    formatter: (row: LoggerType) => {
      return h(
        ElTag,
        {
          type: row.levelTag.colorStyle
        },
        () => row.levelTag.label
      )
    }
  },
  {
    field: 'username',
    label: t('loggerVo.username'),
    width: '100px',
    search: {
      show: true
    }
  },
  {
    field: 'method',
    label: t('loggerVo.method'),
    search: {
      show: true
    }
  },
  {
    field: 'createTime',
    label: t('loggerVo.createTime'),
    width: '180px',
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    width: '360px'
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

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
