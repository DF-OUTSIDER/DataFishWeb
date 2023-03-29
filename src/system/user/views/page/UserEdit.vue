<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-15 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\views\Authorization\page\UserEdit.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import UserWrite from './components/UserWrite.vue'
import { ContentDetailWrap } from '@/components/ContentDetailWrap'

import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { saveUserApi, getUserDetailApi } from '@/system/user/api'
import { useEmitt } from '@/hooks/web/useEmitt'
import { UserType } from '@/system/user/api/types'

const { emitter } = useEmitt()

const { push } = useRouter()
const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<UserType>>(null)

const getUserDetail = async () => {
  const res = await getUserDetailApi(query.id as number)
  if (res) {
    currentRow.value = res.data
  }
}

getUserDetail()

const writeRef = ref<ComponentRef<typeof UserWrite>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as UserType
      const res = await saveUserApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        emitter.emit('getList', 'add')
        push('/system/user')
      }
    }
  })
}
</script>

<template>
  <ContentDetailWrap :title="t('common.edit')" @back="push('/system/user')">
    <UserWrite ref="writeRef" :current-row="currentRow" />

    <template #right>
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('exampleDemo.save') }}
      </ElButton>
    </template>
  </ContentDetailWrap>
</template>
