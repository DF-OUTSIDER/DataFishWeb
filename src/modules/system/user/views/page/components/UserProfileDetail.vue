<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\user\views\page\components\UserProfileDetail.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import { PropType, reactive } from 'vue'
import { Descriptions } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { ElSwitch } from 'element-plus'
import { DescriptionsSchema } from '@/types/descriptions'
import { UserProfileType } from '@/modules/system/user/api/types'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<UserProfileType>>,
    default: () => null
  }
})

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'user.username',
    label: t('userVo.username')
  },
  {
    field: 'user.realname',
    label: t('userVo.realname')
  },
  {
    field: 'user.enable',
    label: t('userVo.enable')
  },
  {
    field: 'roleNames',
    label: t('userProfileVo.roleNames')
  },
  {
    field: 'orgNames',
    label: t('userProfileVo.orgNames')
  }
])
</script>

<template>
  <Descriptions :schema="schema" :data="currentRow || {}">
    <template #[`user.enable`]="{ row }: { row: Recordable | UserProfileType }">
      <ElSwitch :disabled="true" v-if="row.user" v-model="row.user.enable" />
    </template>
  </Descriptions>
</template>
