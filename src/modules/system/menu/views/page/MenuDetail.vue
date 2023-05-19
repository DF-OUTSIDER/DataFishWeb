<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-30 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\menu\views\page\MenuDetail.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentDetailWrap :title="t('common.detail')" @back="push('/system/menu')">
    <Detail :current-row="currentRow" />
  </ContentDetailWrap>
</template>

<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'

import Detail from './components/MenuDetail.vue'
import { getMenuDetailApi } from '@/modules/system/menu/api'

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
</script>
