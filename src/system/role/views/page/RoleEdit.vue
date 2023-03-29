<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-04 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \undefinedd:\publicProject\vue-element-plus-admin\src\views\role\page\RoleEdit.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentDetailWrap :title="t('common.edit')" @back="push('/system/role')">
    <RoleWrite ref="writeRef" :current-row="currentRow" />

    <template #right>
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('common.save') }}
      </ElButton>
    </template>
  </ContentDetailWrap>
</template>

<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'

import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { useEmitt } from '@/hooks/web/useEmitt'

import RoleWrite from './components/RoleWrite.vue'
import { saveRoleApi, getRoleDetailApi } from '@/system/role/api'
import { RoleType } from '@/system/role/api/types'

const { emitter } = useEmitt()

const { push } = useRouter()
const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<RoleType>>(null)

const getRoleDetail = async () => {
  const res = await getRoleDetailApi(query.id as number)
  if (res) {
    currentRow.value = res.data
  }
}

getRoleDetail()

const writeRef = ref<ComponentRef<typeof RoleWrite>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as RoleType
      const res = await saveRoleApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        emitter.emit('getList', 'add')
        push('/system/role')
      }
    }
  })
}
</script>
