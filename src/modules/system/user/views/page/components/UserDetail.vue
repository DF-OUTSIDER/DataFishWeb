<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-15 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\user\views\page\components\UserDetail.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import { PropType, reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { Descriptions } from '@/components/Descriptions'
import { DescriptionsSchema } from '@/types/descriptions'
import { UserType } from '@/modules/system/user/api/types'
import { ElSwitch, ElSelect, ElOption } from 'element-plus'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<UserType>>,
    default: () => null
  }
})

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'username',
    label: t('userVo.username')
  },
  {
    field: 'realname',
    label: t('userVo.realname')
  },
  {
    field: 'encryptionType',
    label: t('userVo.encryptionType')
  },
  {
    field: 'enable',
    label: t('userVo.enable')
  }
])
</script>

<template>
  <Descriptions :schema="schema" :data="currentRow || {}">
    <template #enable="{ row }: { row: Recordable | UserType }">
      <ElSwitch :disabled="true" v-model="row.enable" />
    </template>
    <template #encryptionType="{ row }: { row: Recordable | UserType }">
      <ElSelect :disabled="true" v-model="row.encryptionType" placeholder="Select">
        <ElOption label="NONE" :value="0" />
        <ElOption label="MD5" :value="1" />
        <ElOption label="BCRYPT" :value="2" />
      </ElSelect>
    </template>
  </Descriptions>
</template>
