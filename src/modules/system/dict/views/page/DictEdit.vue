<template>
  <ContentDetailWrap :title="t('common.edit')" @back="push('/system/dict')">
    <DictWrite ref="writeRef" :current-row="currentRow" />

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

import { DictWrite } from './components'
import { saveDictApi, getDictDetailApi } from '@/modules/system/dict/api'
import { DictType } from '@/modules/system/dict/api/types'

const { emitter } = useEmitt()

const { push } = useRouter()
const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<DictType>>(null)

const getDictDetail = async () => {
  const res = await getDictDetailApi(query.id as unknown as number)
  if (res) {
    currentRow.value = res.data
  }
}

getDictDetail()

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
