<div align="center">  <img width="100" src="./public/logo.png"> </a> <br> <br>

<h1>DataFishWeb</h1>
</div>

 **中文**

## 介绍
DataFishWeb是基于vue-element-plus-admin开发，调整及增加功能：
## 系统（system）
- 菜单
- 角色
- 组织
- 用户
- 字典
## 控制（control）
- 数据表
- 数据列
## 工具（tool）
- 定时任务
## 监视（monitor）
- 日志
  
增加了页面结构
```
├── src # 项目代码
│   ├── 原有目录及文件
│   ├── api # api接口管理
│   ├── assets # 静态资源
│   ├── components # 公用组件
│   ├── hooks # 常用hooks
│   ├── layout # 布局组件
│   ├── locales # 语言文件
│   ├── plugins # 外部插件
│   ├── router # 路由配置
│   ├── store # 状态管理
│   ├── styles # 全局样式
│   ├── utils # 全局工具类
│   ├── views # 路由页面
│   ├── App.vue # 入口vue文件
│   ├── main.ts # 主入口文件
│   ├── permission.ts # 路由拦截
│   ├── 新增
│   ├── system（user...）
│   ├── control(table)
│   ├── tool(timer)
│   ├── monitor(log)
│   └── 结束
```
每个功能包含api、views文件，以便前端功能拆分。

项目增加了一些插槽使用的例子，如果有帮助，请点个 ⭐star 支持一下吧。

仅提供系统，运营内容与作者无关，请合法使用。

## 许可证
注意：
使用本项目请保留原作者及本作者信息；
请遵循开源协议使用；
不得使用本项目从事违法犯罪活动；
不得使用本项目直接进行软件著作权注册，使用本平台二次开发进行软件著作权注册需征得原作者及本作者同意；
违反以上内容软件许可即失效。

vue-element-plus-admin 是一个基于 `element-plus` 免费开源的中后台模版。使用了最新的`vue3`，`vite3`，`TypeScript`等主流技术开发，开箱即用的中后台前端解决方案，可以用来作为项目的启动模版，也可用于学习参考。并且时刻关注着最新技术动向，尽可能的第一时间更新。

vue-element-plus-admin 的定位是后台集成方案，不太适合当基础模板来进行二次开发。因为集成了很多你可能用不到的功能，会造成不少的代码冗余。如果你的项目不关注这方面的问题，也可以直接基于它进行二次开发。

如需要基础模版，请切换到 `tempalte` 分支，`tempalte` 只简单集成了一些如：布局、动态菜单等常用布局功能，更适合开发者进行二次开发。

## 特性

- **最新技术栈**：使用 Vue3/vite3 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**: 可配置的主题
- **国际化**：内置完善的国际化方案
- **自定义数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件
- **示例** 内置丰富的示例

## 预览

- [vue-element-plus-admin](https://element-plus-admin.cn/) - 完整版 github 站点
- [vue-element-plus-admin](https://kailong110120130.gitee.io/vue-element-plus-admin) - 完整版 gitee 站点

帐号：**admin/admin test/test**

`admin` 帐号用于模拟服务端控制权限，服务端返回什么就渲染什么

`test` 帐号用于模拟前端控制权限，服务端只返回需要显示的菜单 key，前端进行匹配渲染

## 文档

[文档地址 Github](https://element-plus-admin-doc.cn/)

[文档地址 Gitee](https://kailong110120130.gitee.io/vue-element-plus-admin-doc)

## 前序准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) - 项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉 `TypeScript` 基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Element-Plus](https://element-plus.org/) - element-plus 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 安装和使用

- 获取代码

```bash
git clone https://github.com/kailong321200875/vue-element-plus-admin.git
```

- 安装依赖

```bash
cd vue-element-plus-admin

pnpm install

```

- 运行

```bash
pnpm run dev
```

- 打包

```bash
pnpm run build:pro
```

## 更新日志

[更新日志](./CHANGELOG.md)

## 如何贡献

你可以[提一个 issue](https://github.com/kailong321200875/vue-element-plus-admin/issues/new) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 贡献提交规范

- `feat` 新功能
- `fix` 修补 bug
- `docs` 文档
- `style` 格式、样式(不影响代码运行的变动)
- `refactor` 重构(即不是新增功能，也不是修改 BUG 的代码)
- `perf` 优化相关，比如提升性能、体验
- `test` 添加测试
- `build` 编译相关的修改，对项目构建或者依赖的改动
- `ci` 持续集成修改
- `chore` 构建过程或辅助工具的变动
- `revert` 回滚到上一个版本
- `workflow` 工作流改进
- `mod` 不确定分类的修改
- `wip` 开发中
- `types` 类型

## 浏览器支持

本地开发推荐使用 `Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 许可证

[MIT](./LICENSE)
