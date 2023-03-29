<template>
  <content-wrap :title="t('roleVo.title')" :message="t('common.message')">
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="addAction">{{ t('common.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delRoleOrganizationData(null, true)">
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
      rowKey="id"
      @register="register"
    >
      <!-- <template #action="{ row }">
          <ElButton type="primary" @click="customPermission(row)">
            {{ t('permission.custom') }}
          </ElButton>
        </template> -->
    </Table>
  </content-wrap>

  <ElDialog
    v-model="dialogTableVisible"
    v-bind="getBindValue"
    :fullscreen="isFullscreen"
    destroy-on-close
    lock-scroll
    draggable
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="flex justify-between">
        <slot name="title">
          {{ title }}
        </slot>
        <Icon
          v-if="fullscreen"
          class="mr-18px cursor-pointer is-hover mt-2px z-10"
          :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
          color="var(--el-color-info)"
          @click="toggleFull"
        />
      </div>
    </template>
    <DialogRoles ref="dialogRoles" />
    <template #footer>
      <ElButton type="primary" @click="addRoleOrganization()">{{
        t('dialogDemo.submit')
      }}</ElButton>
      <ElButton @click="closeDialog()">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'

import { Table } from '@/components/Table'
import { TableColumn } from '@/types/table'

import { useTable } from '@/hooks/web/useTable'

import { useEmitt } from '@/hooks/web/useEmitt'

import { useRouter } from 'vue-router'

import { ref, h, unref, reactive, useAttrs, computed, watch } from 'vue'
import { ElButton } from 'element-plus'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { propTypes } from '@/utils/propTypes'

import { DialogOrganizations } from '@/components/organization'
import { DialogRoles } from '@/components/role/src/components'

import { RoleOrganizationType } from '@/system/role/api/types'
import {
  getRoleOrganizationListApi,
  addRoleOrganizationsApi,
  deleteRoleOrganizationListApi
} from '@/system/role/api'

const { t } = useI18n()
const { push } = useRouter()

const props = defineProps({
  organizationId: propTypes.number.def(0)
})

const organizationId = ref(props.organizationId)

interface Params {
  organizationId?: number
  ids: number[]
}

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
const dialogTableVisible = ref(false)

const dialogRoles = ref()

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen)
}

const { register, tableObject, methods } = useTable<RoleOrganizationType>({
  getListApi: getRoleOrganizationListApi,
  //delListApi: removeUserRoleApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

let params: Params = {}
params.organizationId = organizationId.value
tableObject.params = params

const { getList, setSearchParams } = methods

watch(
  () => organizationId,
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
    label: t('roleVo.index'),
    type: 'index'
  },
  {
    field: 'role.code',
    label: t('roleVo.code')
  },
  {
    field: 'role.name',
    label: t('roleVo.name')
  },
  {
    field: 'action',
    label: t('tableDemo.action')
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const addAction = () => {
  dialogTableVisible.value = true
}

const addRoleOrganization = async () => {
  let _params = await dialogRoles.value.getSelections()
  _params.organizationId = organizationId.value
  await addRoleOrganizationsApi(_params).finally(() => {
    getList()
    dialogTableVisible.value = false
  })
}

const delLoading = ref(false)

const delRoleOrganizationData = async (row: RoleOrganizationType | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true
  params.ids = selections.map((v) => v.id)
  await deleteRoleOrganizationListApi(params).finally(() => {
    delLoading.value = false
    getList()
  })
}

const closeDialog = () => {
  dialogTableVisible.value = false
}
</script>
