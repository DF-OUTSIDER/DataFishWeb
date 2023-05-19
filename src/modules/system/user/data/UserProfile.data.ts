/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\user\data\UserProfile.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { PropType, reactive, watch } from 'vue'
import { FormSchema } from '@/types/form'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import i18n from '@/locales'

import { useValidator } from '@/hooks/web/useValidator'
const { required } = useValidator()

const { t } = i18n.global

const rules = reactive({
  username: [required()],
  realname: [required()],
  encryptionType: [required()]
})

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'realname',
    label: t('userVo.realname'),
    form: {
      component: 'Input'
    }
  }
])

export { crudSchemas }
