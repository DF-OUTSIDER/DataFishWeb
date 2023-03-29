/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2023-02-02
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \vue-element-plus-admin\src\locales\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { createI18n } from 'vue-i18n'

// import 'default-passive-events'
import en from './en'
import cn from './zh-CN'

const i18n = createI18n({
  legacy: !true,
  globalInjection: true,
  locale: localStorage.getItem('language') || 'cn',
  messages: {
    en,
    cn
  }
})

export default i18n
