/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\user\data\UserEdit.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { PropType, reactive, watch } from 'vue'
import { FormSchema } from '@/types/form'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import i18n from '@/locales'

import { useValidator } from '@/hooks/web/useValidator'
import { formProps } from './UserForm.data'
import { ElMessage } from 'element-plus'

const { required } = useValidator()

const { t } = i18n.global

const rules = reactive({
  username: [required()],
  realname: [required()],
  encryptionType: [required()]
})

// 用户名联动
const userNameLinkage = (formProps: any) => {
  // 获取表单数据
  const data = formProps?.formExpose?.formModel as Recordable
  const usernameSchema = formProps?.formExpose?.getSchema('username')
  const encryptionTypeSchema = formProps?.formExpose?.getSchema('encryptionType')
  if (data?.username === 'admin') {
    usernameSchema.hidden = true
    encryptionTypeSchema.hidden = true
  } else {
    usernameSchema.hidden = false
    encryptionTypeSchema.hidden = false
  }
}

const crudSchemas = reactive<CrudSchema[]>([
  // {
  //   field: 'username',
  //   label: t('userVo.username'),
  //   form: {
  //     component: 'NumberLinkage',
  //     formItemProps: {},
  //     componentProps: {
  //       options: [
  //         {
  //           label: t('common.disabled'),
  //           value: 0
  //         },
  //         {
  //           label: t('common.enable'),
  //           value: 1
  //         }
  //       ],
  //       formProps: formProps,
  //       linkage: userNameLinkage
  //     }
  //   }
  // },
  {
    field: 'username',
    label: t('userVo.username'),
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
        rules: [required()]
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
    field: 'enable',
    label: t('userVo.enable'),
    form: {
      component: 'Switch',
      formItemProps: {
        rules: [required()]
      }
    }
  }
])

export { crudSchemas }
