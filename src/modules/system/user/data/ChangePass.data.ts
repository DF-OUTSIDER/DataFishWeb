/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\system\user\data\ChangePass.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { PropType, reactive, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { FormSchema } from '@/types/form'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import i18n from '@/locales'

import { useValidator } from '@/hooks/web/useValidator'
import { UserType } from '../api/types'
const { required, isEqual } = useValidator()

const { t } = i18n.global

const _required = (message?: string) => {
  return {
    required: true,
    message: message || t('common.required')
  }
}
let newPass: string

// 测试必须有true、false返回值
const saveNewPass = (callback, value) => {
  newPass = value
  return true
}

// 表单校验
const equalToPassword = (callback, value) => {
  if (newPass != value) {
    ElMessage.error('两次密码不一致')
    //callback()
    return false
  }
  return true
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'oldPassword',
    label: t('userVo.oldPassword'),
    form: {
      value: '123456',
      component: 'InputPassword',
      formItemProps: {
        rules: [required()]
      },
      colProps: {
        span: 24
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
        rules: [
          { required: true, message: t('common.required'), trigger: 'blur' },
          {
            required: true,
            validator: saveNewPass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  {
    field: 'confirmPassword',
    label: t('userVo.confirmPassword'),
    form: {
      value: '123456',
      component: 'InputPassword',
      formItemProps: {
        rules: [
          { required: true, message: t('common.required'), trigger: 'blur' },
          {
            required: true,
            validator: equalToPassword,
            trigger: 'blur'
          }
        ]
      }
    }
  }
])

//   (row: UserType) => {
//     //return isEqual(row.password, row.confirmPassword, () => {}, '')
//     return required()
//   }

export { crudSchemas }
