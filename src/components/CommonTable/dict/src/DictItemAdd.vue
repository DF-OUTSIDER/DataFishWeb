<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-02-02 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\CommonTable\dict\src\DictItemAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ContentWrap :title="t('dictItemVo.title')" :message="t('common.message')">
    <DictItemForm ref="writeRef" :current-row="currentRow" />

    <!-- <template #right>
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('common.save') }}
      </ElButton>
    </template> -->
  </ContentWrap>
</template>

<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'

import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { useEmitt } from '@/hooks/web/useEmitt'

import { propTypes } from '@/utils/propTypes'
import { DictItemType } from '@/modules/system/dict//api/types'
import { saveDictItemApi } from '@/modules/system/dict/api'
import { DictItemForm } from '@/components/CommonForm/dict'

const props = defineProps({
  dictId: propTypes.number.def(0)
})

const dictId = ref(props.dictId)

interface Params {
  dictId?: number
}

let params: Params = {}
params.dictId = dictId.value

const { emitter } = useEmitt()

const { push } = useRouter()
const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<DictItemType>>(null)

const writeRef = ref<ComponentRef<typeof DictItemForm>>()

// const loading = ref(false)

// const save = async () => {
//   const write = unref(writeRef)
//   await write?.elFormRef?.validate(async (isValid) => {
//     if (isValid) {
//       loading.value = true
//       const data = (await write?.getFormData()) as DictItemType
//       data.dictId = dictId.value
//       const res = await saveDictItemApi(data)
//         .catch(() => {})
//         .finally(() => {
//           loading.value = false
//         })
//       if (res) {
//         emitter.emit('getList', 'add')
//         push('/system/dict')
//       }
//     }
//   })
// }

const getDictItemData = async () => {
  const write = unref(writeRef)
  let isValid = await write?.elFormRef?.validate(async (isValid) => {
    return isValid
  })

  const data = (await write?.getFormData()) as DictItemType
  data.dictId = dictId.value
  return data
}

defineExpose({
  getDictItemData
})
</script>
