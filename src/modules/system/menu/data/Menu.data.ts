/*
 * @Author: outsider 515885633@qq.com
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\modules\system\menu\data\Menu.data.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { PropType, reactive, watch, h } from 'vue'
import { ElSwitch } from 'element-plus'
import { FormSchema } from '@/types/form'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import i18n from '@/locales'

import { useValidator } from '@/hooks/web/useValidator'
const { required, isEqual } = useValidator()

import { getMenuCascaderApi } from '@/modules/system/menu/api'
import { ComponentOptions } from '@/types/components'
import { FormProps } from '@/api/common/type'
import { formUtil } from '@/utils/form'

const { t } = i18n.global

export const formProps = {
  formExpose: {},
  actionType: ''
} as FormProps

// 表单初始化方法
export const initForm = (formProps: FormProps) => {
  // 获取表单数据
  const data = formProps?.formExpose?.formModel as Recordable
  // 隐藏
  formUtil.isHiddenSchema(data, formProps, 'redirect')
  formUtil.isHiddenSchema(data, formProps, 'meta.noCache')
  formUtil.isHiddenSchema(data, formProps, 'meta.noTagsView')
  formUtil.isHiddenSchema(data, formProps, 'meta.hidden')
  formUtil.isHiddenSchema(data, formProps, 'meta.activeMenu')
  formUtil.isHiddenSchema(data, formProps, 'meta.canTo')
  formUtil.isHiddenSchema(data, formProps, 'meta.alwaysShow')
}

// 字段联动
const typeLinkage = (formProps: FormProps) => {
  // 表单联动测试
  // 获取表单数据
  const data = formProps?.formExpose?.formModel as Recordable
  if (data) {
    if (data.type === '0') {
      // 目录
      // 显示
      formUtil.isShowSchema(data, formProps, 'component')
      formUtil.isShowSchema(data, formProps, 'meta.alwaysShow')
      formUtil.isShowSchema(data, formProps, 'redirect')
      // 隐藏
      formUtil.isHiddenSchema(data, formProps, 'meta.noCache')
      formUtil.isHiddenSchema(data, formProps, 'meta.noTagsView')
      formUtil.isHiddenSchema(data, formProps, 'meta.hidden')
      formUtil.isHiddenSchema(data, formProps, 'meta.activeMenu')
      formUtil.isHiddenSchema(data, formProps, 'meta.canTo')
    } else if (data.type === '1') {
      // 菜单
      // 显示
      formUtil.isShowSchema(data, formProps, 'component')
      formUtil.isShowSchema(data, formProps, 'meta.alwaysShow')
      formUtil.isShowSchema(data, formProps, 'meta.noCache')
      formUtil.isShowSchema(data, formProps, 'meta.noTagsView')
      formUtil.isShowSchema(data, formProps, 'meta.hidden')
      // 隐藏
      formUtil.isHiddenSchema(data, formProps, 'redirect')
      formUtil.isHiddenSchema(data, formProps, 'meta.activeMenu')
      formUtil.isHiddenSchema(data, formProps, 'meta.canTo')
    } else if (data.type === '2') {
      // 按钮
      // 显示
      formUtil.isShowSchema(data, formProps, 'component')
      formUtil.isShowSchema(data, formProps, 'meta.alwaysShow')
      formUtil.isShowSchema(data, formProps, 'meta.noCache')
      formUtil.isShowSchema(data, formProps, 'meta.noTagsView')
      formUtil.isShowSchema(data, formProps, 'meta.hidden')
      formUtil.isShowSchema(data, formProps, 'meta.activeMenu')
      formUtil.isShowSchema(data, formProps, 'meta.canTo')
      // 隐藏
      formUtil.isHiddenSchema(data, formProps, 'redirect')
    } else if (data.type === '3') {
      formUtil.isHiddenSchema(data, formProps, 'component')
      // 隐藏
      formUtil.isHiddenSchema(data, formProps, 'redirect')
      formUtil.isHiddenSchema(data, formProps, 'meta.noCache')
      formUtil.isHiddenSchema(data, formProps, 'meta.noTagsView')
      formUtil.isHiddenSchema(data, formProps, 'meta.hidden')
      formUtil.isHiddenSchema(data, formProps, 'meta.activeMenu')
      formUtil.isHiddenSchema(data, formProps, 'meta.canTo')
      formUtil.isHiddenSchema(data, formProps, 'meta.alwaysShow')
    }
  }
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'id',
    label: t('menuVo.index'),
    type: 'index',
    form: { show: false }
  },
  {
    field: 'name',
    label: t('menuVo.name'),
    search: {
      show: true
    },
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      },
      componentProps: {
        style: {
          width: '189.5px'
        }
      }
    }
  },
  {
    field: 'code',
    label: t('menuVo.code'),
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      },
      componentProps: {
        style: {
          width: '189.5px'
        }
      }
    }
  },
  {
    field: 'type',
    label: t('menuVo.type'),
    search: {
      show: true
    },
    table: {
      component: 'DictTag',
      componentProps: {
        dictCode: 'menu_type'
      }
    },
    form: {
      component: 'DictRadioButton',
      componentProps: {
        dictCode: 'menu_type',
        formProps: formProps,
        linkage: typeLinkage
      },
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'sort',
    label: t('menuVo.sort'),
    form: {
      component: 'InputNumber',
      value: 0,
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'path',
    label: t('menuVo.path'),
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'component',
    label: t('menuVo.component'),
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'redirect',
    label: t('menuVo.redirect'),
    table: { show: false },
    form: {
      component: 'Input'
    }
  },
  {
    field: 'enable',
    label: t('menuVo.enable'),
    formatter: (row: AppCustomRouteRecordRaw) => {
      return h(ElSwitch, { modelValue: row.enable, disabled: true })
    },
    width: 80,
    form: {
      component: 'Switch',
      value: true
    }
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    width: 230,
    form: { show: false }
  },
  {
    field: 'parents',
    label: t('menuVo.parent'),
    table: { show: false },
    form: {
      component: 'Cascader',
      value: null,
      componentProps: {
        props: { checkStrictly: true }
      },
      api: async () => {
        let data: ComponentOptions[] = []
        const res = await getMenuCascaderApi()
        if (res) {
          data = res.data
        }
        return data
      }
    }
  },
  {
    field: 'field1',
    label: t('metaVo.remark'),
    table: { show: false },
    form: {
      component: 'Divider'
    }
  },
  {
    field: 'meta.title',
    label: t('metaVo.title'),
    table: { show: false },
    form: {
      component: 'Input',
      formItemProps: {
        rules: [required()]
      },
      componentProps: {
        style: {
          width: '189.5px'
        }
      }
    }
  },
  {
    field: 'meta.icon',
    label: t('metaVo.icon'),
    table: { show: false },
    form: {
      component: 'IconSelect'
    }
  },
  {
    field: 'meta.noCache',
    label: t('metaVo.noCache'),
    table: { show: false },
    form: {
      component: 'Switch',
      value: true,
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'meta.alwaysShow',
    label: t('metaVo.alwaysShow'),
    table: { show: false },
    form: {
      component: 'Switch',
      value: false,
      formItemProps: {
        rules: [required()]
      }
    }
  },
  {
    field: 'meta.noTagsView',
    label: t('metaVo.noTagsView'),
    table: { show: false },
    form: {
      component: 'Switch',
      value: false
    }
  },
  // {
  //   field: 'meta.affix',
  //   label: t('metaVo.affix'),
  //   table: { show: false },
  //   form: {
  //     component: 'Switch',
  //     value: false
  //   }
  // },
  {
    field: 'meta.hidden',
    label: t('metaVo.hidden'),
    table: { show: false },
    form: {
      component: 'Switch',
      value: false
    }
  },
  {
    field: 'meta.canTo',
    label: t('metaVo.canTo'),
    table: { show: false },
    form: {
      component: 'Switch',
      value: false
    }
  },
  {
    field: 'meta.activeMenu',
    label: t('metaVo.activeMenu'),
    table: { show: false },
    form: {
      component: 'Input'
    }
  }
])

export const { allSchemas } = useCrudSchemas(crudSchemas)
