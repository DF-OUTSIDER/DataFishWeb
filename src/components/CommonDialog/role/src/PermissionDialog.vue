<!--
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-01-10 
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\CommonDialog\role\src\PermissionDialog.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by outsider 515885633@qq.com, All Rights Reserved. 
-->
<template>
  <PermissionForm ref="writeRef" :current-row="currentRow" />

  <!-- <template #right>
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('common.save') }}
      </ElButton>
    </template> -->
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { saveMenuApi } from '@/modules/system/menu/api'
import { useEmitt } from '@/hooks/web/useEmitt'

import { propTypes } from '@/utils/propTypes'

import { PermissionForm } from '@/components/CommonForm/role'
import { getRolePermissionDetailApi } from '@/modules/system/role/api'
import { PermissionType } from '@/modules/system/permission/api/types'

const props = defineProps({
  roleId: propTypes.number.def(0),
  menuId: propTypes.number.def(0)
})

const roleId = ref(props.roleId)
const menuId = ref(props.menuId)

interface Params {
  id?: number
  menuId?: number
}
let params: Params = {}
params.id = roleId.value
params.menuId = menuId.value

const { emitter } = useEmitt()

const { push } = useRouter()
const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<PermissionType>>(null)

const getRolePermissionDetail = async () => {
  const res = await getRolePermissionDetailApi(params)
  if (res) {
    // if (res.data.hasList) {
    //   res.data.hasList = 'true'
    // } else {
    //   res.data.hasList = 'false'
    // }
    currentRow.value = res.data
  }
}

getRolePermissionDetail()

const writeRef = ref<ComponentRef<typeof PermissionForm>>()

//const loading = ref(false)

// const save = async () => {
//   const write = unref(writeRef)
//   await write?.elFormRef?.validate(async (isValid) => {
//     if (isValid) {
//       loading.value = true
//       const data = (await write?.getFormData()) as PermissionType
//       const res = await saveMenuApi(data)
//         .catch(() => {})
//         .finally(() => {
//           loading.value = false
//         })
//       if (res) {
//         emitter.emit('getList', 'add')
//         push('/system/menu')
//       }
//     }
//   })
// }

const getPermissionData = async () => {
  const write = unref(writeRef)
  let isValid = await write?.elFormRef?.validate(async (isValid) => {
    return isValid
  })

  const data = (await write?.getFormData()) as PermissionType
  return data
}

defineExpose({
  getPermissionData
})
</script>
