/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\user\data\UserAdd.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { PropType, reactive, watch } from 'vue'
import { FormSchema } from '@/types/form'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import i18n from '@/locales'

import { useValidator } from '@/hooks/web/useValidator'
import { ElMessage } from 'element-plus'
import { formProps } from './UserForm.data'

const { required } = useValidator()

const { t } = i18n.global

export const rules = reactive({
  username: [required()],
  realname: [required()],
  encryptionType: [required()]
})

// 字段联动
const kindLinkage = (formProps: any) => {
  // 获取表单数据
  const data = formProps?.formExpose?.formModel as Recordable
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
const userNameLinkage = (formProps: any) => {
  // 获取表单数据
  const data = formProps?.formExpose?.formModel as Recordable
  ElMessage.info(data?.username?.toString())
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'username',
    label: t('userVo.username'),
    form: {
      component: 'InputLinkage',
      // formItemProps: {},
      componentProps: {
        //   options: [
        //     {
        //       label: t('common.disabled'),
        //       value: 0
        //     },
        //     {
        //       label: t('common.enable'),
        //       value: 1
        //     }
        //   ],
        formProps: formProps,
        linkage: userNameLinkage
      }
    }
  },
  // {
  //   field: 'username',
  //   label: t('userVo.username')
  // },
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
        dictCode: 'encryption_type',
        formProps: formProps,
        linkage: kindLinkage
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
