<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\layout\components\Logo\src\Logo.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
import { ref, watch, computed, onMounted, unref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

//import { downByCode } from '@/modules/control/download_file/api'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('logo')

const appStore = useAppStore()

const show = ref(true)

const title = computed(() => appStore.getTitle)

const layout = computed(() => appStore.getLayout)

const collapse = computed(() => appStore.getCollapse)

// const imgData = ref()
// imgData.value = await downByCode('00000000-0000-0000-0000-000000000001')
const logoUrl = ref('/api/v1/downloadFile/download/00000000-0000-0000-0000-000000000001')

onMounted(() => {
  if (unref(collapse)) show.value = false
})

watch(
  () => collapse.value,
  (collapse: boolean) => {
    if (unref(layout) === 'topLeft' || unref(layout) === 'cutMenu') {
      show.value = true
      return
    }
    if (!collapse) {
      setTimeout(() => {
        show.value = !collapse
      }, 400)
    } else {
      show.value = !collapse
    }
  }
)

watch(
  () => layout.value,
  (layout) => {
    if (layout === 'top' || layout === 'cutMenu') {
      show.value = true
    } else {
      if (unref(collapse)) {
        show.value = false
      } else {
        show.value = true
      }
    }
  }
)
</script>

<template>
  <router-link
    :class="[
      prefixCls,
      layout !== 'classic' ? `${prefixCls}__Top` : '',
      'flex !h-[var(--logo-height)] items-center cursor-pointer pl-8px relative',
      'dark:bg-[var(--el-bg-color)]'
    ]"
    to="/"
  >
    <img
      :src="logoUrl"
      class="w-[calc(var(--logo-height)-10px)] h-[calc(var(--logo-height)-10px)]"
    />
    <div
      v-if="show"
      :class="[
        'ml-10px text-16px font-700',
        {
          'text-[var(--logo-title-text-color)]': layout === 'classic',
          'text-[var(--top-header-text-color)]':
            layout === 'topLeft' || layout === 'top' || layout === 'cutMenu'
        }
      ]"
    >
      {{ title }}
    </div>
  </router-link>
</template>
