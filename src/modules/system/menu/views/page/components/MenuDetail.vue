<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-20 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\menu\views\page\components\MenuDetail.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->

<template>
  <Descriptions :schema="schema" :data="currentRow || {}">
    <template #enable="{ row }: { row: AppCustomRouteRecordRaw }">
      <ElSwitch disabled v-model="row.enable" />
    </template>
    <template #[`meta.noCache`]="{ row }: { row: AppCustomRouteRecordRaw }">
      <ElSwitch disabled v-model="_noCache" v-bind="getMetaValue('noCache', row)" />
    </template>

    <template #[`meta.alwaysShow`]="{ row }: { row: AppCustomRouteRecordRaw }">
      <ElSwitch disabled v-model="_alwaysShow" v-bind="getMetaValue('alwaysShow', row)" />
    </template>
    <template #[`meta.noTagsView`]="{ row }: { row: AppCustomRouteRecordRaw }">
      <ElSwitch disabled v-model="_noTagsView" v-bind="getMetaValue('noTagsView', row)" />
    </template>
    <template #[`meta.hidden`]="{ row }: { row: AppCustomRouteRecordRaw }">
      <ElSwitch disabled v-model:model-value="_hidden" v-bind="getMetaValue('hidden', row)" />
    </template>
    <template #[`meta.canTo`]="{ row }: { row: AppCustomRouteRecordRaw }">
      <ElSwitch disabled v-model="_canTo" v-bind="getMetaValue('canTo', row)" />
    </template>
  </Descriptions>
</template>

<script setup lang="ts">
import { h, PropType, computed, ref, reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'

import { ElTag, ElSelect, ElOption, ElSwitch } from 'element-plus'
import { Descriptions } from '@/components/Descriptions'
import { DescriptionsSchema } from '@/types/descriptions'

const { t } = useI18n()

type _RouteMeta = {
  hidden?: boolean
  alwaysShow?: boolean
  title?: string
  icon?: string
  noCache?: boolean
  breadcrumb?: boolean
  affix?: boolean
  activeMenu?: string
  noTagsView?: boolean
  followAuth?: string
  // 跳转开关，应该是指向 activeMenu
  canTo?: boolean
}

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<AppCustomRouteRecordRaw>>,
    default: () => null
  }
})

const schema = reactive<DescriptionsSchema[]>([
  // {
  //   field: 'id',
  //   label: t('menuVo.index')
  // },
  {
    field: 'name',
    label: t('menuVo.menuname')
  },
  {
    field: 'component',
    label: t('menuVo.component')
  },
  {
    field: 'path',
    label: t('menuVo.path')
  },
  {
    field: 'redirectUrl',
    label: t('menuVo.redirect')
  },
  {
    field: 'enable',
    label: t('menuVo.enable')
  },
  {
    field: 'parentName',
    label: t('menuVo.parent')
  },
  {
    field: 'meta.title',
    label: t('metaVo.title')
  },
  {
    field: 'meta.icon',
    label: t('metaVo.icon')
  },
  {
    field: 'meta.noCache',
    label: t('metaVo.noCache')
  },
  {
    field: 'meta.alwaysShow',
    label: t('metaVo.alwaysShow')
  },
  {
    field: 'meta.noTagsView',
    label: t('metaVo.noTagsView')
  },
  {
    field: 'meta.hidden',
    label: t('metaVo.hidden')
  },
  {
    field: 'meta.canTo',
    label: t('metaVo.canTo')
  },
  {
    field: 'meta.activeMenu',
    label: t('metaVo.activeMenu')
  }
])
const _noCache = ref(false)
const _alwaysShow = ref(false)
const _noTagsView = ref(false)
const _hidden = ref(false)
const _canTo = ref(false)

const hasMeta = (row: any) => {
  let hasField = Reflect.has(row, 'meta')
  return hasField
}

const getMetaValue = (field: string, row: any) => {
  let hasField = Reflect.has(row, 'meta')
  if (hasField) {
    let meta: _RouteMeta = row['meta']
    switch (field) {
      case 'noCache':
        _noCache.value = meta[field]
        break
      case 'noTagsView':
        _alwaysShow.value = meta[field]

        break
      case 'alwaysShow':
        _noTagsView.value = meta[field]
        break
      case 'hidden':
        _hidden.value = meta[field]
        break
      case 'canTo':
        _canTo.value = meta[field]
        break
      default:
        break
    }
  }
}
</script>

<!-- <ElSelect :disabled="true" v-model="row.enable" placeholder="Select">
        <ElOption label="禁用" :value="0" />
        <ElOption label="启用" :value="1" />
      </ElSelect> -->
