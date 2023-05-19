<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-13 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\organization\views\page\OrganizationAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentDetailWrap :title="t('common.add')" @back="push('/system/organization')">
    <OrganizationWrite ref="writeRef" />

    <template #right>
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('exampleDemo.save') }}
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

import { OrganizationWrite } from './components'
import { organizationType } from '@/modules/system/organization/api/types'
import { saveOrganizationApi } from '@/modules/system/organization/api'

const { emitter } = useEmitt()

const { push } = useRouter()

const { t } = useI18n()

const writeRef = ref<ComponentRef<typeof OrganizationWrite>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as organizationType
      const res = await saveOrganizationApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        emitter.emit('getList', 'add')
        push('/system/organization')
      }
    }
  })
}
</script>
