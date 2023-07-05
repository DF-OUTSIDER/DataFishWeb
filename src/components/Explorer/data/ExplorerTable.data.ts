/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\components\Explorer\data\ExplorerTable.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { h, reactive } from 'vue'
import { ElSwitch } from 'element-plus'
import i18n from '@/locales'

import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { useValidator } from '@/hooks/web/useValidator'

import { FormProps } from '@/api/common/type'

const { required } = useValidator()

const { t } = i18n.global

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'name',
    label: t('baseVo.name')
  }
])

export const { allSchemas } = useCrudSchemas(crudSchemas)
