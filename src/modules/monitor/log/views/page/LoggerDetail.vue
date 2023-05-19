<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-30 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\monitor\log\views\page\LoggerDetail.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentDetailWrap :title="t('common.detail')" @back="push('/monitor/log')">
    <Detail :current-row="currentRow" />
  </ContentDetailWrap>
</template>

<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'

import Detail from './components/LoggerDetail.vue'
import { getLoggerDetailApi } from '@/modules/monitor/log/api'
import { LoggerType } from '@/modules/monitor/log/api/types'

const { push } = useRouter()

const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<LoggerType>>(null)

const getLoggerDetail = async () => {
  const res = await getLoggerDetailApi(query.id as string)
  if (res) {
    currentRow.value = res.data
  }
}

getLoggerDetail()
</script>
