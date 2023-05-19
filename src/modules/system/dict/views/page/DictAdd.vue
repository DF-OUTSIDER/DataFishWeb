<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-02-01 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\dict\views\page\DictAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentDetailWrap :title="t('common.add')" @back="push('/system/dict')">
    <DictWrite ref="writeRef" />

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

import { DictWrite } from './components'

import { saveDictApi } from '@/modules/system/dict/api'
import { DictType } from '@/modules/system/dict/api/types'

const { emitter } = useEmitt()

const { push } = useRouter()

const { t } = useI18n()

const writeRef = ref<ComponentRef<typeof DictWrite>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as DictType
      const res = await saveDictApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        emitter.emit('getList', 'add')
        push('/system/dict')
      }
    }
  })
}
</script>
