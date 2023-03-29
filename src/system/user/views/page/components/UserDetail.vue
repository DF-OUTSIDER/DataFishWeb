<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-15 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\views\Authorization\page\components\UserDetail.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import { h, PropType, reactive } from 'vue'
import { Descriptions } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { ElTag, ElSelect, ElSwitch, ElOption } from 'element-plus'
import { DescriptionsSchema } from '@/types/descriptions'
import { UserType } from '@/system/user/api/types'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<UserType>>,
    default: () => null
  }
})

const schema = reactive<DescriptionsSchema[]>([
  // {
  //   field: 'id',
  //   label: t('userVo.index')
  // },
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
    <template #enable="{ row }: { row: UserType }">
      <ElSwitch :disabled="true" v-model="row.enable" />
      <!-- <ElSwitch disabled v-model="row.enable" /> -->
    </template>
    <template #encryptionType="{ row }: { row: UserType }">
      <ElSelect :disabled="true" v-model="row.encryptionType" placeholder="Select">
        <ElOption label="NONE" :value="0" />
        <ElOption label="MD5" :value="1" />
        <ElOption label="BCRYPT" :value="2" />
      </ElSelect>
    </template>
  </Descriptions>
</template>
