<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-20 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\menu\views\page\MenuEdit.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'

import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { useEmitt } from '@/hooks/web/useEmitt'

import MenuWrite from './components/MenuWrite.vue'
import { getMenuDetailApi, saveMenuApi } from '@/modules/system/menu/api'

import { crudSchemas } from '../../data/Menu.data'
import { useCrudSchemas } from '@/hooks/web/useCrudSchemas'
const { allSchemas } = useCrudSchemas(crudSchemas)

const { emitter } = useEmitt()

const { push } = useRouter()
const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<AppCustomRouteRecordRaw>>(null)

const getMenuDetail = async () => {
  const res = await getMenuDetailApi(query.id as unknown as number)
  if (res) {
    currentRow.value = res.data
  }
}

getMenuDetail()

const writeRef = ref<ComponentRef<typeof MenuWrite>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as AppCustomRouteRecordRaw
      const res = await saveMenuApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        emitter.emit('getList', 'add')
        push('/system/menu')
      }
    }
  })
}
</script>

<template>
  <ContentDetailWrap :title="t('common.edit')" @back="push('/system/menu')">
    <MenuWrite ref="writeRef" :current-row="currentRow" :schema="allSchemas.formSchema" />

    <template #right>
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('common.save') }}
      </ElButton>
    </template>
  </ContentDetailWrap>
</template>
