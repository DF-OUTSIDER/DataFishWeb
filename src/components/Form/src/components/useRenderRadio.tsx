/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\components\Form\src\components\useRenderRadio.tsx
 * @Description:
 *
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved.
 */
import { FormSchema } from '@/types/form'
import { ElRadio, ElRadioButton } from 'element-plus'
import { defineComponent } from 'vue'

export const useRenderRadio = () => {
  const renderRadioOptions = (item: FormSchema) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    const valueAlias = item?.componentProps?.optionsAlias?.valueField
    const Com = (item.component === 'Radio' ? ElRadio : ElRadioButton) as ReturnType<
      typeof defineComponent
    >
    return item?.componentProps?.options?.map((option) => {
      const { value, ...other } = option
      return (
        <Com {...other} label={option[valueAlias || 'value']}>
          {option[labelAlias || 'label']}
        </Com>
      )
    })
  }

  return {
    renderRadioOptions
  }
}
