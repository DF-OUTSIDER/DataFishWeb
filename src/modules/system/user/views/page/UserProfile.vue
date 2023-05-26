<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\user\views\page\UserProfile.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('userInfo.title')" :message="t('common.message')">
    <div class="flex">
      <ElCard class="w-1/3 user" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>{{ t('userProfileVo.title') }}</span>
          </div>
        </template>
        <UserProfileDetail :current-row="currentRow" />
      </ElCard>
      <ElCard class="w-2/3 user ml-3" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>{{ t('userInfo.info') }}</span>
          </div>
        </template>
        <div>
          <ElTabs>
            <ElTabPane :label="t('userInfo.basicInfo')">
              <UserProfileWrite :current-row="userCurrentRow" />
            </ElTabPane>
            <ElTabPane :label="t('userInfo.changePassword')">
              <ChangePass :current-row="userCurrentRow" />
            </ElTabPane>
            <!-- <ElTabPane :label="t('userInfo.title')" /> -->
          </ElTabs>
        </div>
      </ElCard>
    </div>
  </ContentWrap>
</template>

<script setup lang="ts">
import { h, PropType, reactive, ref, unref } from 'vue'
import { ElDialog, ElTag, ElCard, ElTabs, ElTabPane, ElButton } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { useEmitt } from '@/hooks/web/useEmitt'
import { useRouter, useRoute } from 'vue-router'

import { UserType, UserProfileType } from '@/modules/system/user/api/types'
import { getUserProfileDetailApi } from '@/modules/system/user/api'

import UserProfileDetail from './components/UserProfileDetail.vue'

import ChangePass from './components/ChangePass.vue'
import UserProfileWrite from './components/UserProfileWrite.vue'

const { t } = useI18n()

const currentRow = ref<Nullable<UserProfileType>>(null)
const userCurrentRow = ref<Nullable<UserType>>(null)

const initUserInfo = async () => {
  getUserProfileDetailApi().then((res) => {
    currentRow.value = res.data
    userCurrentRow.value = currentRow.value?.user
  })
}
initUserInfo()

// 用于子组件调用
useEmitt({
  name: 'initUserInfo',
  callback: () => {
    initUserInfo()
  }
})
</script>
<style scoped>
.user {
  max-height: 960px;
  padding: 15px 20px 20px 20px;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
