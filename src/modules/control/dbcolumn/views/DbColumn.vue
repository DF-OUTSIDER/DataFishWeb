<template>
  <ContentWrap
    :title="tableName"
    :message="t('common.message')"
    :show-back="true"
    @back="push('/control/dbTable')"
  >
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton :loading="saveLoading" type="primary" @click="saveColumnConfig">
        {{ t('common.save') }}
      </ElButton>
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
      <template #columnKey="{ row }">
        <ElTag v-if="row.columnKey">{{ row.columnKey }}</ElTag>
      </template>
      <!-- <template #dataType="{ row }">
        <ElInput v-model="row.dataType" @change="columnChange(row)" placeholder="" />
      </template> -->
      <template #[`columnConfig.name`]="{ row }">
        <ElInput
          v-if="row.columnConfig"
          v-model="row.columnConfig.name"
          @change="columnChange(row)"
          placeholder=""
        />
      </template>
      <template #[`columnConfig.fieldType`]="{ row }">
        <ElSelect
          v-if="row.columnConfig"
          v-model="row.columnConfig.fieldType"
          v-bind="initColumn(row)"
          @change="columnChange(row)"
          placeholder="无"
        >
          <ElOption label="Long" value="Long" />
          <ElOption label="String" value="String" />
          <ElOption label="Integer" value="Integer" />
          <ElOption label="Double" value="Double" />
          <ElOption label="BigDecimal" value="BigDecimal" />
          <ElOption label="Date" value="Date" />
          <ElOption label="Boolean" value="Boolean" />
        </ElSelect>
      </template>
      <template #[`columnConfig.formType`]="{ row }">
        <ElSelect
          v-if="
            row.columnConfig &&
            !['create_by', 'create_time', 'update_by', 'update_time'].includes(row.name)
          "
          v-model="row.columnConfig.formType"
          @change="columnChange(row)"
          placeholder="无"
        >
          <ElOption label="文本框" value="Input" />
          <ElOption label="文本域" value="Textarea" />
          <ElOption label="开关" value="Switch" />
          <ElOption label="单选框" value="Radio" />
          <ElOption label="下拉框" value="Select" />
          <ElOption label="日期框" value="Date" />
          <ElOption label="复选框" value="Checkbox" />
          <ElOption label="图片上传" value="ImageUpload" />
          <ElOption label="文件上传" value="FileUpload" />
          <ElOption label="富文本控件" value="Editor" />
        </ElSelect>
      </template>
      <template #[`columnConfig.queryType`]="{ row }">
        <ElSelect
          v-if="row.columnConfig"
          v-model="row.columnConfig.queryType"
          @change="columnChange(row)"
          placeholder="无"
        >
          <ElOption label="=" value="=" />
          <ElOption label="!=" value="!=" />
          <ElOption label=">" value=">" />
          <ElOption label=">=" value=">=" />
          <ElOption label="<" value="<=" />
          <ElOption label="<=" value="<=" />
          <ElOption label="LIKE" value="LIKE" />
          <ElOption label="BETWEEN" value="BETWEEN" />
          <ElOption label="NotNull" value="NotNull" />
          <ElOption label="无" value="" />
        </ElSelect>
        <!-- <ElCheckbox v-model="row.columnConfig.queryType" @change="columnChange(row)" size="small" /> -->
      </template>
      <template #[`columnConfig.notNull`]="{ row }">
        <ElCheckbox
          v-if="
            row.columnConfig &&
            !['id', 'create_by', 'create_time', 'update_by', 'update_time'].includes(row.name)
          "
          v-model="row.columnConfig.notNull"
          @change="columnChange(row)"
          size="small"
        />
      </template>
      <template #[`columnConfig.addShow`]="{ row }">
        <ElCheckbox
          v-if="
            row.columnConfig &&
            !['id', 'create_by', 'create_time', 'update_by', 'update_time'].includes(row.name)
          "
          v-model="row.columnConfig.addShow"
          @change="columnChange(row)"
          size="small"
        />
      </template>
      <template #[`columnConfig.updateShow`]="{ row }">
        <ElCheckbox
          v-if="
            row.columnConfig &&
            !['id', 'create_by', 'create_time', 'update_by', 'update_time'].includes(row.name)
          "
          v-model="row.columnConfig.updateShow"
          @change="columnChange(row)"
          size="small"
        />
      </template>
      <template #[`columnConfig.detailShow`]="{ row }">
        <ElCheckbox
          v-if="row.columnConfig && row.name != 'id'"
          v-model="row.columnConfig.detailShow"
          @change="columnChange(row)"
          size="small"
        />
      </template>
      <template #[`columnConfig.listShow`]="{ row }">
        <ElCheckbox v-model="row.columnConfig.listShow" @change="columnChange(row)" size="small" />
      </template>

      <template #[`columnConfig.comment`]="{ row }">
        <ElInput
          v-if="row.columnConfig"
          v-model="row.columnConfig.comment"
          @change="columnChange(row)"
          placeholder=""
        />
      </template>
      <template #action="{ row }">
        <ElButton type="primary" @click="action(row, 'edit')">
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
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { TableColumn } from '@/types/table'

import { ref, h, reactive } from 'vue'
import {
  ElButton,
  ElDrawer,
  ElTag,
  ElInput,
  ElForm,
  ElCheckbox,
  ElSelect,
  ElOption,
  ElMessage
} from 'element-plus'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'
import { useRouter, useRoute } from 'vue-router'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { DbColumnType } from '@/modules/control/dbcolumn/api/types'
import { getDbColumnListApi, saveDbColumnListApi } from '@/modules/control/dbcolumn/api'

const { push } = useRouter()

// 传递参数
const { query } = useRoute()

interface Params {
  pageIndex?: number
  pageSize?: number
  tableName?: string
}

const { t } = useI18n()

const { register, tableObject, methods } = useTable<DbColumnType>({
  getListApi: getDbColumnListApi,
  //delListApi: deleteLoggerListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

// 保存修改的行
const changes = new Map()

// 初始化行数据
const initColumn = (row: DbColumnType) => {
  // FieldType 设置JAVA字段类型
  if (row.dataType === 'bigint') {
    row.columnConfig.fieldType = 'Long'
  } else if (row.dataType === 'bit') {
    row.columnConfig.fieldType = 'Boolean'
  } else if (['datetime', 'timestamp'].includes(row.dataType)) {
    row.columnConfig.fieldType = 'Date'
  } else if (row.dataType === 'varchar') {
    row.columnConfig.fieldType = 'String'
  }
  if (!row.columnConfig.name) {
    row.columnConfig.name = row.columnComment
  }
  if (!row.columnConfig.comment) {
    row.columnConfig.comment = row.columnComment
  }
}

// 选择的行
//const selections = ref<Recordable[]>([])
//const changes = ref<DbColumnType[]>([])

// 列更新更新行
const columnChange = (row: DbColumnType) => {
  // alert(row.dataType)
  ElMessage.info(row.name)
  changes.set(row.code, row)
}

let params: Params = {}
params.tableName = query.tableName as string
tableObject.params = params

const tableName = ref(t('dbColumnVo.title') + ' ' + params.tableName)

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
    label: t('dbColumnVo.index'),
    type: 'index',
    width: 60
  },
  {
    field: 'name',
    label: t('dbColumnVo.name'),
    width: 130
  },
  {
    field: 'columnConfig.name',
    label: t('dbColumnConfigVo.name'),
    width: 143
  },
  {
    field: 'columnKey',
    label: t('dbColumnVo.columnKey'),
    width: 100
  },
  {
    field: 'dataType',
    label: t('dbColumnVo.dataType'),
    width: 100
  },
  {
    field: 'columnConfig.fieldType',
    label: t('dbColumnConfigVo.fieldType'),
    width: 143
  },
  {
    field: 'columnConfig.formType',
    label: t('dbColumnConfigVo.formType'),
    width: 143
  },
  {
    field: 'columnConfig.notNull',
    label: t('dbColumnConfigVo.notNull'),
    width: 60,
    align: 'center'
  },
  {
    field: 'columnConfig.addShow',
    label: t('dbColumnConfigVo.addShow'),
    width: 60,
    align: 'center'
  },
  {
    field: 'columnConfig.updateShow',
    label: t('dbColumnConfigVo.updateShow'),
    width: 60,
    align: 'center'
  },
  {
    field: 'columnConfig.detailShow',
    label: t('dbColumnConfigVo.detailShow'),
    width: 60,
    align: 'center'
  },
  {
    field: 'columnConfig.listShow',
    label: t('dbColumnConfigVo.listShow'),
    width: 60,
    align: 'center'
  },
  {
    field: 'columnConfig.queryType',
    label: t('dbColumnConfigVo.queryType'),
    width: 130
  },
  {
    field: 'columnConfig.comment',
    label: t('dbColumnConfigVo.comment')
  }
  // ,
  // {
  //   field: 'action',
  //   label: t('tableDemo.action'),
  //   width: '360px'
  // }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const saveLoading = ref(false)
const saveColumnConfig = async () => {
  saveLoading.value = true
  await saveDbColumnListApi(Array.from(changes).map((item) => item[1])).finally(() => {
    changes.clear()
    getList()
    saveLoading.value = false
  })
}

const delLoading = ref(false)
const delData = async (row: DbColumnType | null, multiple: boolean) => {
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

const action = (row: DbColumnType, type: string) => {
  //alert('hello world in TypeScript!')
  switch (type) {
    case 'detail':
      {
        // todo 显示详细信息
        push(`/monitor/log/log-${type}?name=${row.name}`)
      }
      break

    default:
      break
  }
}
</script>
