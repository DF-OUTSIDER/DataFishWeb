<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Explorer\src\TableExplorer.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div id="PCDesktop" @click="desktopClick">
    <ContentWrap title="文件浏览" :message="t('common.message')">
      <ExploerBreadCrumb
        :explorerName="props.explorerName"
        :fileType="fileType"
        :filePath="filePath"
        :breadCrumbList="breadCrumbList"
        :clickToDirectoryCallBack="directoryPathClickCb"
        :blurEnterExplorerPathCallBack="directoryPathBlurEnterCb"
      />
      <Table
        v-model:pageSize="tableObject.pageSize"
        v-model:currentPage="tableObject.currentPage"
        :columns="allSchemas.tableColumns"
        :data="tableObject.tableList"
        :loading="tableObject.loading"
        :selection="true"
        @register="register"
        :row-dblclick="rowDblclick"
        :row-contextmenu="rowContextmenu"
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
  </div>
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
import { WebExplorerEntry, WebExplorerType } from '@/modules/control/explorer/api/types'

import { openContextMenus } from '@/layout/components/ClickMenu'

const { t } = i18n.global

const { openMenu, closeMenu, isShow } = openContextMenus()

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
const breadCrumbList = ref<string[]>([])

// 获取表格数据
const getTableData = async () => {
  const res = await getPathLsApi({
    storageConfigId: props.storageConfigId,
    path: filePath.value,
    name: ''
  })
  return { data: { list: res.data } }
}

// 面包屑文件夹路径点击回调
const directoryPathClickCb = async (path: string, index: number) => {
  if ('/' == path) {
    filePath.value = '/'
    breadCrumbList.value = []
  } else {
    filePath.value = '/'
    breadCrumbList.value = breadCrumbList.value.slice(0, index + 1)
    let i: number
    for (i = 0; i <= index; i++) {
      filePath.value += breadCrumbList.value.at(i) + '/'
    }
  }
  // 刷新列表
  await getList()
}

// 路径输入框失去焦点回调
const directoryPathBlurEnterCb = async (path: string) => {
  if ('/' == path) {
    filePath.value = '/'
    breadCrumbList.value = []
  } else {
    filePath.value = path
    breadCrumbList.value = []
    let pathItems: string[] = path.split('/')
    let i: number
    let item: string
    for (i = 0; i < pathItems.length; i++) {
      item = pathItems.at(i) as string
      if ('' !== item) {
        breadCrumbList.value.push(item)
      }
    }
  }
  // 刷新列表
  await getList()
}

// 双击行回调
const rowDblclick = async (row: WebExplorerEntry) => {
  if (row.isDirectory) {
    filePath.value += row.name + '/'
    breadCrumbList.value.push(row.name)
    // 刷新列表
    await getList()
  } else {
    ElMessage.warning('请双击文件夹进入！')
  }
}

const desktopClick = () => {
  closeMenu()
}

// 右键点击
const rowContextmenu = (row: WebExplorerEntry, column: any, event: any) => {
  closeMenu()
  let data = {
    storageConfigId: props.storageConfigId,
    path: row.path,
    name: row.name
  } as WebExplorerType
  openMenu(event, data)
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
