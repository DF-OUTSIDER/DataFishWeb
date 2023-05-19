<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-02-08 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\tool\timer_task\views\TimerTask.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('timerTaskVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="addAction">{{ t('common.add') }}</ElButton>
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
        <!-- <ElButton type="primary" @click="action(row, 'dictConfig')">
          {{ t('action.dictConfig') }}
        </ElButton> -->
      </template>
    </Table>
    <!-- <ElDrawer
        v-model="isShowDictItems"
        direction="rtl"
        :destroy-on-close="true"
        size="800px"
        :z-index="1000"
      >
        <DictItem :dictId="dictId" />
      </ElDrawer> -->
  </ContentWrap>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'

import { useRouter } from 'vue-router'

import { ref } from 'vue'
import { allSchemas } from '../data/TimerTask.data'

import { getTimerTaskListApi, deleteTimerTaskListApi } from '@/modules/tool/timer_task/api'
import { TimerTaskType } from '@/modules/tool/timer_task/api/types'

const { push } = useRouter()

const { t } = useI18n()

const { register, tableObject, methods } = useTable<TimerTaskType>({
  getListApi: getTimerTaskListApi,
  delListApi: deleteTimerTaskListApi,
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

const addAction = () => {
  push('/tool/timerTask/timerTask-add')
}

const delLoading = ref(false)

const delData = async (row: TimerTaskType | null, multiple: boolean) => {
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

//const dictId = ref(0)

// 显示字典明细配置
//const isShowDictItems = ref(false)

const action = (row: TimerTaskType, type: string) => {
  switch (type) {
    case 'edit':
      {
        // 激活菜单
        push(`/tool/timerTask/timerTask-${type}?id=${row.id}`)
      }
      break

    default:
      break
  }
}
</script>
