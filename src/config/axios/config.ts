/*
 * @Author: outsider 515885633@qq.com
 * @Date: 2022-11-09
 * @LastEditors: outsider 515885633@qq.com
 * @FilePath: \DataFishWeb\src\config\axios\config.ts
 * @Description:
 * Copyright (c) 2022 by outsider 515885633@qq.com, All Rights Reserved
 */
const config: {
  base_url: {
    base: string
    dev: string
    pro: string
    test: string
  }
  result_code: number | string
  default_headers: AxiosHeaders
  request_timeout: number
} = {
  /**
   * api请求基础路径
   */
  base_url: {
    // 开发环境接口前缀
    base: '/api/v1',

    // 打包开发环境接口前缀
    dev: '/api/v1',

    // 打包生产环境接口前缀
    pro: '/api/v1',

    // 打包测试环境接口前缀
    test: '/api/v1'
  },

  /**
   * 接口成功返回状态码
   */
  result_code: '200',

  /**
   * 接口请求超时时间
   */
  request_timeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

export { config }
