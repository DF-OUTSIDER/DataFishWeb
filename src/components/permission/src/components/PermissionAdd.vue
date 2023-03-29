<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-12-29 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\permission\src\components\PermissionAdd.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <PermissionWrite ref="writeRef" />
</template>

<script setup lang="ts">
import { ContentDetailWrap } from '@/components/ContentDetailWrap'

import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'
import { useEmitt } from '@/hooks/web/useEmitt'
import { propTypes } from '@/utils/propTypes'

import { saveAuthorityApi } from '@/api/permission'
import { MenuPermission } from '@/api/permission/types'
import PermissionWrite from './PermissionWrite.vue'

const { emitter } = useEmitt()

const { push } = useRouter()

const { t } = useI18n()

const props = defineProps({
  menuId: propTypes.number.def(0),
  closeDialog: {
    type: Function,
    default: () => {}
  }
})

const writeRef = ref<ComponentRef<typeof PermissionWrite>>()

const loading = ref(false)

const menuId = ref(props.menuId)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as MenuPermission
      data.menuId = menuId.value
      const res = await saveAuthorityApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        //emitter.emit('closeDialog')
        //push('/system/user')
        emitter.emit('getList', 'add')
        props.closeDialog()
      }
    }
  })
}

defineExpose({
  save
})
</script>
