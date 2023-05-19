/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \undefinedd:\publicProject\vue-element-plus-admin\src\components\CommonForm\role\src\PermissionType.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { reactive, h } from 'vue'
import i18n from '@/locales'
import { FormSchema } from '@/types/form'

import { useValidator } from '@/hooks/web/useValidator'
const { required } = useValidator()

const { t } = i18n.global

const schema = reactive<FormSchema[]>([
  {
    field: 'name',
    label: t('permissionVo.name'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    },
    colProps: {
      span: 24
    }
  },
  {
    field: 'hasList',
    label: t('common.list'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  },
  {
    field: 'hasInsert',
    label: t('common.insert'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  },
  {
    field: 'hasUpdate',
    label: t('common.update'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  },
  {
    field: 'hasDelete',
    label: t('common.delete'),
    component: 'Switch',
    value: false,
    colProps: {
      span: 4
    }
  }
])

export { schema }
