<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-20 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \undefinedd:\publicProject\vue-element-plus-admin\src\views\menu\page\MenuAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'

import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'
import { useEmitt } from '@/hooks/web/useEmitt'

import MenuWrite from './components/MenuWrite.vue'
import { saveMenuApi } from '@/system/menu/api'

const { emitter } = useEmitt()

const { push } = useRouter()

const { t } = useI18n()

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
  <ContentDetailWrap :title="t('common.add')" @back="push('/system/menu')">
    <MenuWrite ref="writeRef" />

    <template #right>
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('exampleDemo.save') }}
      </ElButton>
    </template>
  </ContentDetailWrap>
</template>
