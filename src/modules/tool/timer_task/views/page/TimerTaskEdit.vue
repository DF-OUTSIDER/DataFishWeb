<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-02-08 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\tool\timer_task\views\page\TimerTaskEdit.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ContentDetailWrap :title="t('common.edit')" @back="push('/tool/timerTask')">
    <TimerTaskWrite ref="writeRef" :current-row="currentRow" />

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

import { TimerTaskWrite } from './components'
import { saveTimerTaskApi, getTimerTaskDetailApi } from '@/modules/tool/timer_task/api'
import { TimerTaskType } from '@/modules/tool/timer_task/api/types'

const { emitter } = useEmitt()

const { push } = useRouter()
const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<TimerTaskType>>(null)

const getTimerTaskDetail = async () => {
  const res = await getTimerTaskDetailApi(query.id as number)
  if (res) {
    currentRow.value = res.data
  }
}

getTimerTaskDetail()

const writeRef = ref<ComponentRef<typeof TimerTaskWrite>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as TimerTaskType
      const res = await saveTimerTaskApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        emitter.emit('getList', 'add')
        push('/tool/timerTask')
      }
    }
  })
}
</script>
