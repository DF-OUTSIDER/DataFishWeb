/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\modules\system\user\data\UserAdd.data.ts
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

export const rules = reactive({
  username: [required()],
  realname: [required()],
  encryptionType: [required()]
})

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'username',
    label: t('userVo.username'),
    form: {
      component: 'Input',
      formItemProps: {
        //rules: [required()]
      }
      //,
      // colProps: {
      //   span: 24
      // }
    }
  },
  {
    field: 'realname',
    label: t('userVo.realname'),
    form: {
      component: 'Input',
      formItemProps: {
        //rules: [required()]
      }
    }
  },
  {
    field: 'encryptionType',
    label: t('userVo.encryptionType'),
    form: {
      component: 'DictSelect',
      formItemProps: {
        //rules: [required()]
      },
      componentProps: {
        dictCode: 'encryption_type'
      }
    }
  },
  {
    field: 'password',
    label: t('userVo.password'),
    form: {
      value: '123456',
      component: 'InputPassword',
      formItemProps: {
        //rules: [required()]
      }
    }
  },
  {
    field: 'enable',
    label: t('userVo.enable'),
    form: {
      component: 'Switch',
      formItemProps: {
        //rules: [required()]
      }
    }
  }
])

export { crudSchemas }
