/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\CommonForm\dict\src\DictItemForm.data.ts
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
    label: t('dictItemVo.name'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'code',
    label: t('dictItemVo.code'),
    component: 'Input',
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'enable',
    label: t('dictItemVo.enable'),
    component: 'Switch',
    value: true,
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'sort',
    label: t('dictItemVo.sort'),
    component: 'InputNumber',
    value: 0,
    formItemProps: {
      rules: [required()]
    }
  },
  {
    field: 'colorCode',
    label: t('dictItemVo.colorCode'),
    component: 'DictSelect',
    componentProps: {
      dictCode: 'color_type'
    }
    // ,
    // componentProps: {
    //   options: [
    //     {
    //       label: 'option1',
    //       value: '1'
    //     },
    //     {
    //       label: 'option2',
    //       value: '2'
    //     }
    //   ]
    // }
  }
])

export { schema }
