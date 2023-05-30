/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\user\data\User.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { PropType, h, reactive, watch } from 'vue'
import { FormSchema } from '@/types/form'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import i18n from '@/locales'

import { useValidator } from '@/hooks/web/useValidator'
import { ElMessage, ElSwitch } from 'element-plus'

import { FormProps } from '@/api/common/type'
import { UserType } from '../api/types'

const { required } = useValidator()

const { t } = i18n.global

export const formProps = {
  formExpose: {},
  actionType: ''
} as FormProps

export const rules = reactive({
  username: [required()],
  realname: [required()],
  encryptionType: [required()]
})

// 字段联动
const kindLinkage = (formProps: FormProps) => {
  // 表单联动测试
  // const tenantSchema = formProps?.formExpose?.getSchema('tenantId')
  // if (tenantSchema === null) {
  //   formProps?.formExpose?.addSchema(
  //     {
  //       label: '租户',
  //       field: 'tenantId',
  //       component: 'Input'
  //     } as FormSchema,
  //     3
  //   )
  // } else {
  //   formProps?.formExpose?.delSchema('tenantId')
  // }
}

// 用户名联动
const userNameLinkage = (formProps: FormProps) => {
  // 获取表单数据
  const data = formProps?.formExpose?.formModel as Recordable
  if (formProps?.actionType == 'update') {
    const usernameSchema = formProps?.formExpose?.getSchema('username')
    const encryptionTypeSchema = formProps?.formExpose?.getSchema('encryptionType')

    // 管理员隐藏用户名、加密方式
    if (data?.username === 'admin') {
      usernameSchema.hidden = true
      encryptionTypeSchema.hidden = true
    } else {
      usernameSchema.hidden = false
      encryptionTypeSchema.hidden = false
    }
  }
}
// 密码联动，注意密码联动为组件加载前只执行一次。
const passwordLinkage = (formProps: FormProps) => {
  // 此时 formProps?.formExpose?.formModel 没有加载编辑的数据
  if (formProps?.actionType == 'update') {
    const passwordSchema = formProps?.formExpose?.getSchema('password')

    // 编辑隐藏密码
    passwordSchema.hidden = true
  }
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('userVo.index'),
    type: 'index',
    form: {
      show: false
    }
  },
  {
    field: 'username',
    label: t('userVo.username'),
    search: {
      show: true
    },
    formatter: (row: UserType) => {
      return h('span', { class: 'el-tag el-tag--light el-tooltip__trigger' }, row.username)
    },
    form: {
      component: 'InputLinkage',
      formItemProps: {
        rules: [required()]
      },
      componentProps: {
        formProps: formProps,
        linkage: userNameLinkage
      }
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
    table: {
      component: 'DictTag',
      componentProps: {
        // disabled: true,
        dictCode: 'encryption_type'
      }
    },
    form: {
      component: 'DictSelect',
      formItemProps: {
        //rules: [required()]
      },
      componentProps: {
        dictCode: 'encryption_type',
        formProps: formProps,
        linkage: kindLinkage
      }
    }
  },
  {
    field: 'password',
    label: t('userVo.password'),
    table: {
      show: false
    },
    form: {
      value: '123456',
      component: 'InputPassword',
      formItemProps: {
        //rules: [required()]
      },
      componentProps: {
        formProps: formProps,
        linkage: passwordLinkage
      }
    }
  },
  {
    field: 'enable',
    label: t('userVo.enable'),
    formatter: (row: UserType) => {
      return h(ElSwitch, { modelValue: row.enable, disabled: true })
    },
    form: {
      component: 'Switch',
      formItemProps: {
        //rules: [required()]
      }
    }
  },
  {
    field: 'action',
    width: '360px',
    label: t('tableDemo.action'),
    form: {
      show: false
    }
  }
])

export { crudSchemas }
