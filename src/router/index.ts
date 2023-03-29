import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    id: 1,
    path: '/',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    id: 2,
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        id: 3,
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    id: 4,
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    id: 5,
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  // {
  //   id: 6,
  //   path: '/dashboard',
  //   component: Layout,
  //   redirect: '/dashboard/analysis',
  //   name: 'Dashboard',
  //   meta: {
  //     title: t('router.dashboard'),
  //     icon: 'ant-design:dashboard-filled',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       id: 7,
  //       path: 'analysis',
  //       component: () => import('@/views/Dashboard/Analysis.vue'),
  //       name: 'Analysis',
  //       meta: {
  //         title: t('router.analysis'),
  //         noCache: true,
  //         affix: true
  //       }
  //     },
  //     {
  //       id: 8,
  //       path: 'workplace',
  //       component: () => import('@/views/Dashboard/Workplace.vue'),
  //       name: 'Workplace',
  //       meta: {
  //         title: t('router.workplace'),
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: 9,
  //   path: '/external-link',
  //   component: Layout,
  //   meta: {},
  //   name: 'ExternalLink',
  //   children: [
  //     {
  //       id: 10,
  //       path: 'https://element-plus-admin-doc.cn/',
  //       name: 'DocumentLink',
  //       meta: {
  //         title: t('router.document'),
  //         icon: 'clarity:document-solid'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: 11,
  //   path: '/guide',
  //   component: Layout,
  //   name: 'Guide',
  //   meta: {},
  //   children: [
  //     {
  //       id: 12,
  //       path: 'index',
  //       component: () => import('@/views/Guide/Guide.vue'),
  //       name: 'GuideDemo',
  //       meta: {
  //         title: t('router.guide'),
  //         icon: 'cib:telegram-plane'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: 13,
  //   path: '/components',
  //   component: Layout,
  //   name: 'ComponentsDemo',
  //   meta: {
  //     title: t('router.component'),
  //     icon: 'bx:bxs-component',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       id: 14,
  //       path: 'form',
  //       component: getParentLayout(),
  //       redirect: '/components/form/default-form',
  //       name: 'Form',
  //       meta: {
  //         title: t('router.form'),
  //         alwaysShow: true
  //       },
  //       children: [
  //         {
  //           id: 15,
  //           path: 'default-form',
  //           component: () => import('@/views/Components/Form/DefaultForm.vue'),
  //           name: 'DefaultForm',
  //           meta: {
  //             title: t('router.defaultForm')
  //           }
  //         },
  //         {
  //           id: 16,
  //           path: 'use-form',
  //           component: () => import('@/views/Components/Form/UseFormDemo.vue'),
  //           name: 'UseForm',
  //           meta: {
  //             title: 'UseForm'
  //           }
  //         },
  //         {
  //           id: 17,
  //           path: 'ref-form',
  //           component: () => import('@/views/Components/Form/RefForm.vue'),
  //           name: 'RefForm',
  //           meta: {
  //             title: 'RefForm'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       id: 18,
  //       path: 'table',
  //       component: getParentLayout(),
  //       redirect: '/components/table/default-table',
  //       name: 'TableDemo',
  //       meta: {
  //         title: t('router.table'),
  //         alwaysShow: true
  //       },
  //       children: [
  //         {
  //           id: 19,
  //           path: 'default-table',
  //           component: () => import('@/views/Components/Table/DefaultTable.vue'),
  //           name: 'DefaultTable',
  //           meta: {
  //             title: t('router.defaultTable')
  //           }
  //         },
  //         {
  //           id: 20,
  //           path: 'use-table',
  //           component: () => import('@/views/Components/Table/UseTableDemo.vue'),
  //           name: 'UseTable',
  //           meta: {
  //             title: 'UseTable'
  //           }
  //         },
  //         {
  //           id: 21,
  //           path: 'ref-table',
  //           component: () => import('@/views/Components/Table/RefTable.vue'),
  //           name: 'RefTable',
  //           meta: {
  //             title: 'RefTable'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       id: 22,
  //       path: 'editor-demo',
  //       component: getParentLayout(),
  //       redirect: '/components/editor-demo/editor',
  //       name: 'EditorDemo',
  //       meta: {
  //         title: t('router.editor'),
  //         alwaysShow: true
  //       },
  //       children: [
  //         {
  //           id: 23,
  //           path: 'editor',
  //           component: () => import('@/views/Components/Editor/Editor.vue'),
  //           name: 'Editor',
  //           meta: {
  //             title: t('router.richText')
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       id: 24,
  //       path: 'search',
  //       component: () => import('@/views/Components/Search.vue'),
  //       name: 'Search',
  //       meta: {
  //         title: t('router.search')
  //       }
  //     },
  //     {
  //       id: 25,
  //       path: 'descriptions',
  //       component: () => import('@/views/Components/Descriptions.vue'),
  //       name: 'Descriptions',
  //       meta: {
  //         title: t('router.descriptions')
  //       }
  //     },
  //     {
  //       id: 26,
  //       path: 'image-viewer',
  //       component: () => import('@/views/Components/ImageViewer.vue'),
  //       name: 'ImageViewer',
  //       meta: {
  //         title: t('router.imageViewer')
  //       }
  //     },
  //     {
  //       id: 27,
  //       path: 'dialog',
  //       component: () => import('@/views/Components/Dialog.vue'),
  //       name: 'Dialog',
  //       meta: {
  //         title: t('router.dialog')
  //       }
  //     },
  //     {
  //       id: 28,
  //       path: 'icon',
  //       component: () => import('@/views/Components/Icon.vue'),
  //       name: 'Icon',
  //       meta: {
  //         title: t('router.icon')
  //       }
  //     },
  //     {
  //       id: 29,
  //       path: 'echart',
  //       component: () => import('@/views/Components/Echart.vue'),
  //       name: 'Echart',
  //       meta: {
  //         title: t('router.echart')
  //       }
  //     },
  //     {
  //       id: 30,
  //       path: 'count-to',
  //       component: () => import('@/views/Components/CountTo.vue'),
  //       name: 'CountTo',
  //       meta: {
  //         title: t('router.countTo')
  //       }
  //     },
  //     {
  //       id: 31,
  //       path: 'qrcode',
  //       component: () => import('@/views/Components/Qrcode.vue'),
  //       name: 'Qrcode',
  //       meta: {
  //         title: t('router.qrcode')
  //       }
  //     },
  //     {
  //       id: 32,
  //       path: 'highlight',
  //       component: () => import('@/views/Components/Highlight.vue'),
  //       name: 'Highlight',
  //       meta: {
  //         title: t('router.highlight')
  //       }
  //     },
  //     {
  //       id: 33,
  //       path: 'infotip',
  //       component: () => import('@/views/Components/Infotip.vue'),
  //       name: 'Infotip',
  //       meta: {
  //         title: t('router.infotip')
  //       }
  //     },
  //     {
  //       id: 34,
  //       path: 'input-password',
  //       component: () => import('@/views/Components/InputPassword.vue'),
  //       name: 'InputPassword',
  //       meta: {
  //         title: t('router.inputPassword')
  //       }
  //     },
  //     {
  //       id: 35,
  //       path: 'sticky',
  //       component: () => import('@/views/Components/Sticky.vue'),
  //       name: 'Sticky',
  //       meta: {
  //         title: t('router.sticky')
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: 36,
  //   path: '/hooks',
  //   component: Layout,
  //   redirect: '/hooks/useWatermark',
  //   name: 'Hooks',
  //   meta: {
  //     title: 'hooks',
  //     icon: 'ic:outline-webhook',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       id: 37,
  //       path: 'useWatermark',
  //       component: () => import('@/views/hooks/useWatermark.vue'),
  //       name: 'UseWatermark',
  //       meta: {
  //         title: 'useWatermark'
  //       }
  //     },
  //     {
  //       id: 38,
  //       path: 'useCrudSchemas',
  //       component: () => import('@/views/hooks/useCrudSchemas.vue'),
  //       name: 'UseCrudSchemas',
  //       meta: {
  //         title: 'useCrudSchemas'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: 39,
  //   path: '/level',
  //   component: Layout,
  //   redirect: '/level/menu1/menu1-1/menu1-1-1',
  //   name: 'Level',
  //   meta: {
  //     title: t('router.level'),
  //     icon: 'carbon:skill-level-advanced'
  //   },
  //   children: [
  //     {
  //       id: 40,
  //       path: 'menu1',
  //       name: 'Menu1',
  //       component: getParentLayout(),
  //       redirect: '/level/menu1/menu1-1/menu1-1-1',
  //       meta: {
  //         title: t('router.menu1')
  //       },
  //       children: [
  //         {
  //           id: 41,
  //           path: 'menu1-1',
  //           name: 'Menu11',
  //           component: getParentLayout(),
  //           redirect: '/level/menu1/menu1-1/menu1-1-1',
  //           meta: {
  //             title: t('router.menu11'),
  //             alwaysShow: true
  //           },
  //           children: [
  //             {
  //               id: 42,
  //               path: 'menu1-1-1',
  //               name: 'Menu111',
  //               component: () => import('@/views/Level/Menu111.vue'),
  //               meta: {
  //                 title: t('router.menu111')
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           id: 43,
  //           path: 'menu1-2',
  //           name: 'Menu12',
  //           component: () => import('@/views/Level/Menu12.vue'),
  //           meta: {
  //             title: t('router.menu12')
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       id: 44,
  //       path: 'menu2',
  //       name: 'Menu2',
  //       component: () => import('@/views/Level/Menu2.vue'),
  //       meta: {
  //         title: t('router.menu2')
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: 45,
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/example-dialog',
  //   name: 'Example',
  //   meta: {
  //     title: t('router.example'),
  //     icon: 'ep:management',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       id: 46,
  //       path: 'example-dialog',
  //       component: () => import('@/views/Example/Dialog/ExampleDialog.vue'),
  //       name: 'ExampleDialog',
  //       meta: {
  //         title: t('router.exampleDialog')
  //       }
  //     },
  //     {
  //       id: 47,
  //       path: 'example-page',
  //       component: () => import('@/views/Example/Page/ExamplePage.vue'),
  //       name: 'ExamplePage',
  //       meta: {
  //         title: t('router.examplePage')
  //       }
  //     },
  //     {
  //       id: 48,
  //       path: 'example-add',
  //       component: () => import('@/views/Example/Page/ExampleAdd.vue'),
  //       name: 'ExampleAdd',
  //       meta: {
  //         title: t('router.exampleAdd'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/example/example-page'
  //       }
  //     },
  //     {
  //       id: 49,
  //       path: 'example-edit',
  //       component: () => import('@/views/Example/Page/ExampleEdit.vue'),
  //       name: 'ExampleEdit',
  //       meta: {
  //         title: t('router.exampleEdit'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/example/example-page'
  //       }
  //     },
  //     {
  //       id: 50,
  //       path: 'example-detail',
  //       component: () => import('@/views/Example/Page/ExampleDetail.vue'),
  //       name: 'ExampleDetail',
  //       meta: {
  //         title: t('router.exampleDetail'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/example/example-page'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: 51,
  //   path: '/error',
  //   component: Layout,
  //   redirect: '/error/404',
  //   name: 'Error',
  //   meta: {
  //     title: t('router.errorPage'),
  //     icon: 'ci:error',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       id: 52,
  //       path: '404-demo',
  //       component: () => import('@/views/Error/404.vue'),
  //       name: '404Demo',
  //       meta: {
  //         title: '404'
  //       }
  //     },
  //     {
  //       id: 53,
  //       path: '403-demo',
  //       component: () => import('@/views/Error/403.vue'),
  //       name: '403Demo',
  //       meta: {
  //         title: '403'
  //       }
  //     },
  //     {
  //       id: 54,
  //       path: '500-demo',
  //       component: () => import('@/views/Error/500.vue'),
  //       name: '500Demo',
  //       meta: {
  //         title: '500'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: 55,
  //   path: '/system',
  //   component: Layout,
  //   redirect: '#',
  //   name: 'system',
  //   meta: {
  //     title: t('router.system'),
  //     icon: 'eos-icons:role-binding',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       id: 56,
  //       path: 'user',
  //       component: () => import('@/views/Authorization/User.vue'),
  //       name: 'User',
  //       meta: {
  //         title: t('router.user')
  //       }
  //     },
  //     {
  //       id: 57,
  //       path: 'user-add',
  //       component: () => import('@/views/Authorization/page/UserAdd.vue'),
  //       name: 'UserAdd',
  //       meta: {
  //         title: t('analysis.newUser'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/system/user'
  //       }
  //     },
  //     {
  //       id: 58,
  //       path: 'user-edit',
  //       component: () => import('@/views/Authorization/page/UserEdit.vue'),
  //       name: 'UserEdit',
  //       meta: {
  //         title: t('common.edit'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/system/user'
  //       }
  //     },
  //     {
  //       id: 59,
  //       path: 'user-detail',
  //       component: () => import('@/views/Authorization/page/UserDetail.vue'),
  //       name: 'UserDetail',
  //       meta: {
  //         title: t('common.detail'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/system/user'
  //       }
  //     },
  //     {
  //       id: 70,
  //       path: 'role',
  //       component: () => import('@/views/role/Role.vue'),
  //       name: 'Role',
  //       meta: {
  //         title: t('router.role')
  //       }
  //     },
  //     {
  //       id: 75,
  //       path: 'role-add',
  //       component: () => import('@/views/role/page/RoleAdd.vue'),
  //       name: 'RoleAdd',
  //       meta: {
  //         title: t('common.add'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/system/role'
  //       }
  //     },
  //     {
  //       id: 76,
  //       path: 'role-edit',
  //       component: () => import('@/views/role/page/RoleEdit.vue'),
  //       name: 'RoleEdit',
  //       meta: {
  //         title: t('common.edit'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/system/role'
  //       }
  //     },
  //     {
  //       id: 71,
  //       path: 'menu',
  //       component: () => import('@/views/menu/Menu.vue'),
  //       name: 'Menu',
  //       meta: {
  //         title: t('router.menu')
  //       }
  //     },
  //     {
  //       id: 72,
  //       path: 'menu-add',
  //       component: () => import('@/views/menu/page/MenuAdd.vue'),
  //       name: 'MenuAdd',
  //       meta: {
  //         title: t('common.add'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/system/menu'
  //       }
  //     },
  //     {
  //       id: 73,
  //       path: 'menu-edit',
  //       component: () => import('@/views/menu/page/MenuEdit.vue'),
  //       name: 'MenuEdit',
  //       meta: {
  //         title: t('common.edit'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/system/menu'
  //       }
  //     },
  //     {
  //       id: 74,
  //       path: 'menu-detail',
  //       component: () => import('@/views/menu/page/MenuDetail.vue'),
  //       name: 'MenuDetail',
  //       meta: {
  //         title: t('common.detail'),
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/system/menu'
  //       }
  //     }
  // ,
  // {
  //   id: 100,
  //   path: 'menu1',
  //   component: () => import('@/views/system/menu/Menu1.vue'),
  //   name: 'Menu1',
  //   meta: {
  //     title: t('router.menu')
  //   }
  // }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
