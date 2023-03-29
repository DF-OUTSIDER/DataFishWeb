<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-04
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\system\user\views\page\UserDetail.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <ContentDetailWrap :title="t('common.detail')" @back="push('/system/user')">
    <Detail :current-row="currentRow" />
  </ContentDetailWrap>
</template>

<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
import { ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'

import Detail from './components/UserDetail.vue'
import { getUserDetailApi } from '@/system/user/api'
import { UserType } from '@/system/user/api/types'

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
</script>
