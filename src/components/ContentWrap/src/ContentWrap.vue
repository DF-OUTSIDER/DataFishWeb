<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\ContentWrap\src\ContentWrap.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import { ElCard, ElTooltip, ElButton, ElRow, ElCol } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'
import { useI18n } from '@/hooks/web/useI18n'
import { Sticky } from '@/components/Sticky'

const { t } = useI18n()

import { ref, defineEmits } from 'vue'
const emit = defineEmits(['back'])

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('content-wrap')

const props = defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def(''),
  showBack: propTypes.bool.def(false)
})

const showBack = ref(props.showBack)
</script>

<template>
  <ElCard :class="[prefixCls]" shadow="never">
    <template v-if="title" #header>
      <el-row :gutter="20" align="middle">
        <el-col v-if="showBack" :span="2">
          <el-button @click="emit('back')">
            <Icon icon="ep:arrow-left" class="mr-5px" />
            {{ t('common.back') }}
          </el-button>
        </el-col>
        <el-col :span="6">
          <div class="flex items-center">
            <span class="text-16px font-700">{{ title }}</span>
            <ElTooltip v-if="message" effect="dark" placement="right">
              <template #content>
                <div class="max-w-200px">{{ message }}</div>
              </template>
              <Icon class="ml-5px" icon="bi:question-circle-fill" :size="14" />
            </ElTooltip>
          </div>
        </el-col>
      </el-row>
    </template>
    <div>
      <slot></slot>
    </div>
  </ElCard>
</template>
