<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\system\user\views\page\components\UserProfileWrite.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <UserWrite ref="writeRef" :schema="allSchemas.formSchema" :current-row="currentRow" />
  <ElButton type="primary" :loading="loading" @click="save">
    {{ t('exampleDemo.save') }}
  </ElButton>
</template>
<script setup lang="ts">
import { PropType, ref, unref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useEmitt } from '@/hooks/web/useEmitt'

import { useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import UserWrite from './UserWrite.vue'
import { crudSchemas } from '../../../data/UserProfile.data'

import { UserType } from '@/modules/system/user/api/types'
import { saveUserApi } from '@/modules/system/user/api'

const { t } = useI18n()
const { emitter } = useEmitt()

const { allSchemas } = useCrudSchemas(crudSchemas)

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<UserType>>,
    default: () => null
  }
})

const writeRef = ref<ComponentRef<typeof UserWrite>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as UserType
      const res = await saveUserApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        emitter.emit('initUserInfo')
      }
    }
  })
}
</script>
