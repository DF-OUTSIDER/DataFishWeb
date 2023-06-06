<template>
  <ContentWrap :title="t('dictItemVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="addAction('add')">{{ t('common.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delDictItemData(null, true)">
        {{ t('common.remove') }}
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
        <!-- <ElButton type="primary" @click="action(row, 'detail')">
          {{ t('tableDemo.action') }}
        </ElButton>
        <ElButton type="primary" @click="action(row, '')">
          {{ t('tableDemo.action') }}
        </ElButton> -->
      </template>
    </Table>
  </ContentWrap>

  <ElDialog
    v-model="dialogVisible"
    v-bind="getBindValue"
    :fullscreen="isFullscreen"
    :destroy-on-close="true"
    lock-scroll
    draggable
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="flex justify-between">
        <!-- <slot name="title">
          {{ title }}
        </slot> -->
        <Icon
          v-if="fullscreen"
          class="mr-18px cursor-pointer is-hover mt-2px z-10"
          :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
          color="var(--el-color-info)"
          @click="toggleFull"
        />
      </div>
    </template>

    <DictItemAdd v-if="actionType === 'add'" ref="dictItemAdd" />
    <DictItemEdit
      v-if="actionType === 'edit'"
      ref="dictItemEdit"
      :id="dictItemId"
      :dict-id="dictId"
    />
    <template #footer>
      <ElButton v-if="actionType === 'add'" type="primary" @click="addDictItem()">{{
        t('dialogDemo.submit')
      }}</ElButton>
      <ElButton v-if="actionType === 'edit'" type="primary" @click="editDictItem()">{{
        t('dialogDemo.submit')
      }}</ElButton>
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElTag } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'
import { TableColumn } from '@/types/table'

import { useTable } from '@/hooks/web/useTable'
import { useEmitt } from '@/hooks/web/useEmitt'

import { useRouter } from 'vue-router'

import { ref, h, reactive, useAttrs, computed, watch } from 'vue'
import { ElButton } from 'element-plus'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { propTypes } from '@/utils/propTypes'

import { getDictItemListApi, saveDictItemApi, deleteDictItemApi } from '@/modules/system/dict/api'
import { DictItemType } from '@/modules/system/dict/api/types'

import DictItemAdd from './DictItemAdd.vue'
import DictItemEdit from './DictItemEdit.vue'
import { useDictStoreWithOut } from '@/store/modules/dict'
import { updateDict } from '@/utils/dict'

const dictStore = useDictStoreWithOut()

const props = defineProps({
  dictId: propTypes.number.def(0)
})

const getBindValue = computed(() => {
  const delArr: string[] = ['fullscreen', 'title', 'maxHeight']
  const attrs = useAttrs()
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
})

const fullscreen = ref(true)
const isFullscreen = ref(false)

const actionType = ref('')
const dialogVisible = ref(false)

// 用于组件之间交互
const dictItemAdd = ref()
const dictItemEdit = ref()

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen)
}

const dictId = ref(props.dictId)

interface Params {
  dictId?: number
  ids: number[]
}

const { t } = useI18n()

const { register, tableObject, methods } = useTable<DictItemType>({
  getListApi: getDictItemListApi,
  //delListApi: deleteDictItemApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

//tableObject.params.roleid = roleId.value
let params: Params = {}
params.dictId = dictId.value
tableObject.params = params

const { getList, getSelections, setSearchParams } = methods

watch(
  () => dictId,
  (newValue, oldValue) => {
    getList()
  },
  {
    immediate: true
  }
)

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
    label: t('dictItemVo.index'),
    type: 'index'
  },
  {
    field: 'name',
    label: t('dictItemVo.name'),
    search: {
      show: true
    }
  },
  {
    field: 'code',
    label: t('dictItemVo.code'),
    search: {
      show: true
    }
  },
  {
    field: 'sort',
    label: t('dictItemVo.sort')
  },
  {
    field: 'colorCode',
    label: t('dictItemVo.colorCode')
  },
  {
    field: 'colorTag',
    label: t('dictItemVo.colorCode'),
    formatter: (row: DictItemType) => {
      return h(
        ElTag,
        {
          type: row.colorTag.colorStyle === 'default' ? '' : row.colorTag.colorStyle
        },
        () => row.colorTag.label
      )
    }
  },
  {
    field: 'action',
    width: '160px',
    label: t('tableDemo.action')
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const addAction = (type: string) => {
  switch (type) {
    case 'add':
      actionType.value = type
      dialogVisible.value = true
      break
    default:
      break
  }
}

const delLoading = ref(false)

const delDictItemData = async (row: DictItemType | null, multiple: boolean) => {
  tableObject.currentRow = row
  //const { getSelections } = methods
  const selections = await getSelections()
  //const selections = await dictItems.value.getSelections()
  delLoading.value = true
  params.ids = selections.map((v) => v.id)
  await deleteDictItemApi(params.ids).finally(() => {
    delLoading.value = false
    getList()
  })
}

const action = (row: DictItemType, type: string) => {
  // 功能未开启，激活菜单
  //push(`/system/user/user-${type}?id=${row.id}`)
  switch (type) {
    case 'edit':
      {
        actionType.value = type
        dialogVisible.value = true

        dictItemId.value = row.id
      }
      break
    default:
      break
  }
}

const addDictItem = async () => {
  let data = await dictItemAdd.value.getDictItemData()
  data.dictId = dictId.value
  await saveDictItemApi(data).finally(() => {
    getList()
    // 更新字典数据
    updateDict(dictId.value)
    dialogVisible.value = false
  })
}

const dictItemId = ref(0)

const editDictItem = async () => {
  let data = await dictItemEdit.value.getDictItemData()
  data.dictId = dictId.value
  await saveDictItemApi(data).finally(() => {
    getList()
    // 更新字典数据
    updateDict(dictId.value)
    dialogVisible.value = false
  })
}
</script>
