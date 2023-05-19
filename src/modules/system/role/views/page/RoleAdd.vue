<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-04
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\role\views\page\RoleAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentDetailWrap :title="t('common.add')" @back="push('/system/role')">
    <RoleWrite ref="writeRef" :schema="allSchemas.formSchema" />

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
import { useRouter } from 'vue-router'
import { useEmitt } from '@/hooks/web/useEmitt'

import RoleWrite from './components/RoleWrite.vue'
import { saveRoleApi } from '@/modules/system/role/api'
import { RoleType } from '@/modules/system/role/api/types'

import { useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { crudSchemas } from '../../data/role.data'

const { emitter } = useEmitt()

const { push } = useRouter()

const { t } = useI18n()

const { allSchemas } = useCrudSchemas(crudSchemas)

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
