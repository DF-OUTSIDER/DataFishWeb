<template>
  <ContentWrap :title="t('dbTableVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton :loading="delLoading" type="primary" @click="delData(null, true)">
        {{ t('common.add') }}
      </ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
        {{ t('exampleDemo.del') }}
      </ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
        {{ t('common.sync') }}
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
        <ElButton type="primary" @click="action(row, 'config')">
          {{ t('common.config') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'edit')">
          {{ t('common.edit') }}
        </ElButton>
        <ElButton type="primary" @click="codeGenerator(row)">
          {{ t('common.generator') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <DbTableConfigWrite v-if="actionType == 'config'" ref="writeRef" :current-row="currentRow" />

    <template #footer>
      <ElButton
        v-if="actionType == 'config'"
        type="primary"
        :loading="loading"
        @click="saveTableConfig"
      >
        {{ t('common.save') }}
      </ElButton>
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { TableColumn } from '@/types/table'

import { ref, unref, h, reactive } from 'vue'
import { ElButton, ElDrawer, ElTag, ElMessage } from 'element-plus'
import { Dialog } from '@/components/Dialog'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'
import { useRouter } from 'vue-router'

import { DbTableType } from '@/modules/control/dbtable/api/types'
import {
  getDbTableListApi,
  getDbTableConfigDetailApi,
  saveDbTableConfigApi,
  createCodeApi
} from '@/modules/control/dbtable/api'

import { DbTableConfigType } from '@/modules/control/dbtable/api/types'
import DbTableConfigWrite from './page/DbTableConfigWrite.vue'

import { allSchemas } from '../data/Dbtable.data'
import { getDbSourceDetailApi } from '../../dbsource/api'

const { push } = useRouter()

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const { register, tableObject, methods } = useTable<DbTableType>({
  getListApi: getDbTableListApi,
  //delListApi: deleteLoggerListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList, setSearchParams } = methods

getList()

const delLoading = ref(false)
const delData = async (row: DbTableType | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true
  await delList(
    multiple ? selections.map((v) => v.name) : [tableObject.currentRow?.name as string],
    multiple
  ).finally(() => {
    delLoading.value = false
  })
}

const writeRef = ref<ComponentRef<typeof DbTableConfigWrite>>()

const loading = ref(false)

const dialogVisible = ref(false)
const dialogTitle = ref('表单配置')
const actionType = ref('')

const currentRow = ref<Nullable<DbTableConfigType>>(null)

// 获取tableConfig
const getDbTableConfigDetail = async (row: DbTableType) => {
  const res = await getDbTableConfigDetailApi(row.code, row.dbsourceId)
  if (res) {
    currentRow.value = res.data
    if (currentRow.value !== null && !currentRow.value?.dbsourceId) {
      currentRow.value.dbsourceId = row.dbsourceId
    }
  }
}

// 代码生成
const codeGenerator = async (row: DbTableType) => {
  const res = await createCodeApi(row)
  if (res) {
    ElMessage.info('生成成功')
    getList()
  }
}

const action = (row: DbTableType, type: string) => {
  switch (type) {
    case 'config':
      {
        actionType.value = type
        dialogVisible.value = true
        getDbTableConfigDetail(row)
      }
      break
    case 'edit':
      {
        actionType.value = type
        // todo 跳转到
        push(`/control/dbColumn?tableName=${row.name}`)
      }
      break
    // case 'detail':
    //   {
    //     // todo 显示详细信息
    //     push(`/monitor/log/log-${type}?name=${row.name}`)
    //   }
    //   break

    default:
      break
  }
}

// 保存表单配置
const saveTableConfig = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as DbTableConfigType
      const res = await saveDbTableConfigApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        dialogVisible.value = false
        tableObject.currentPage = 1
        getList()
      }
    }
  })
}
useEmitt({
  name: 'getList',
  callback: (type: string) => {
    if (type === 'add') {
      tableObject.currentPage = 1
    }
    getList()
  }
})
useEmitt({
  name: 'search',
  callback: (model: Recordable | undefined) => {
    tableObject.params = model
    getList()
  }
})
// 重置搜索查询
useEmitt({
  name: 'reset',
  callback: (model: Recordable | undefined) => {
    tableObject.params = model
    getList()
  }
})
</script>
