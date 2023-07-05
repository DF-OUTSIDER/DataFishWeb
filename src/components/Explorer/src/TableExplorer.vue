<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Explorer\src\TableExplorer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ContentWrap title="文件浏览" :message="t('common.message')">
    <ExploerBreadCrumb
      :explorerName="props.explorerName"
      :fileType="fileType"
      :filePath="filePath"
      :breadCrumbList="breadCrumbList"
    />
    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :selection="true"
      @register="register"
      @rowDblclick="rowDblclick"
    >
      <template #name="{ row }">
        <Icon v-if="row.isDirectory" icon="fa:folder" />
        <Icon v-if="!row.isDirectory" icon="fa:file-text" /> {{ row.name }}
      </template>
      <!-- <template #action="{ row }">
        <ElButton v-hasPermi="['storage::insert']" type="primary" @click="action(row, 'edit')">
          {{ t('common.edit') }}
        </ElButton>

        <ElButton type="primary" @click="action(row, 'detail')">
          {{ t('common.detail') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, 'explorer')">
          {{ '浏览' }}
        </ElButton>
      </template> -->
    </Table>
  </ContentWrap>
</template>
<script setup lang="ts">
import i18n from '@/locales'
import { propTypes } from '@/utils/propTypes'
import { onMounted, PropType, ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import ExploerBreadCrumb from './ExplorerBreadCrumb.vue'

import { allSchemas } from '../data/ExplorerTable.data'

import { getPathLsApi } from '@/modules/control/explorer/api'
import { ElMessage, ElIcon } from 'element-plus'
import { WebExplorerEntry } from '@/modules/control/explorer/api/types'

const { t } = i18n.global

const props = defineProps({
  storageConfigId: propTypes.number.def(0),
  explorerName: {
    type: String as PropType<string>,
    default: ''
  },
  callBack: {
    type: Function as PropType<(filePath: string) => void>,
    default(filePath: string) {
      console.log(filePath)
    }
  }
})

const fileType = ref(1)
const filePath = ref('/')
const breadCrumbList = ref([])

const getTableData = async () => {
  const res = await getPathLsApi({
    storageConfigId: props.storageConfigId,
    path: filePath.value,
    name: ''
  })
  return { data: { list: res.data } }
}
const rowDblclick = async (row: WebExplorerEntry) => {
  if (row.isDirectory) {
    filePath.value += row.name + '/'
    breadCrumbList.value.push(row.name)
    // 刷新列表
    await getList()
    // props.cellDblclickCallBack(filePath.value)
  } else {
    ElMessage.warning('请双击文件夹进入！')
  }
}

const { register, tableObject, methods } = useTable<WebExplorerEntry>({
  getListApi: getTableData,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList } = methods

// ### 初始化
onMounted(async () => {
  await getList()
})
</script>