<!--
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\user\views\page\components\ChangePass.vue
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
import { ElButton, ElMessage } from 'element-plus'
import { useEmitt } from '@/hooks/web/useEmitt'

import { useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import UserWrite from './UserWrite.vue'
import { crudSchemas } from '../../../data/ChangePass.data'

import { UserType } from '@/modules/system/user/api/types'
import { changePasswordApi } from '@/modules/system/user/api'

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
      const res = await changePasswordApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        ElMessage.info(res.data as any)
        emitter.emit('initUserInfo')
      }
    }
  })
}
</script>
