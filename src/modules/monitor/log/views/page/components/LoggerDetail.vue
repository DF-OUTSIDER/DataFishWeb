<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-30
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\monitor\log\views\page\components\LoggerDetail.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <Descriptions :schema="schema" :data="currentRow || {}">
    <template #level="{ row }: { row: LoggerType }">
      <ElTag :type="row.level == 'INFO' ? 'success' : row.level == 'ERROR' ? 'danger' : 'warning'">
        {{
          row.level == 'INFO'
            ? t('common.info')
            : row.level == 'ERROR'
            ? t('common.error')
            : t('common.warning')
        }}
      </ElTag>
    </template>
    <template #message="{ row }: { row: LoggerType }">
      <div v-html="row.message"></div>
    </template>
  </Descriptions>
</template>

<script setup lang="ts">
import { PropType, reactive, h } from 'vue'
import { Descriptions } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { ElTag } from 'element-plus'
import { DescriptionsSchema } from '@/types/descriptions'

import { LoggerType } from '@/modules/monitor/log/api/types'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<LoggerType>>,
    default: () => null
  }
})

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'username',
    label: t('loggerVo.username')
  },
  {
    field: 'createTime',
    label: t('loggerVo.createTime')
  },
  {
    field: 'level',
    label: t('loggerVo.level')
  },
  {
    field: 'browser',
    label: t('loggerVo.browser')
  },
  {
    field: 'method',
    label: t('loggerVo.method'),
    span: 24
  },
  {
    field: 'params',
    label: t('loggerVo.params'),
    span: 24
  },
  {
    field: 'message',
    label: t('loggerVo.message'),
    span: 24
  }
])
</script>
