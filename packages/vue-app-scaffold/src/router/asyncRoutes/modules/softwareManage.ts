import { Layout } from '@/router/layout'
import { $t } from "@/plugins/locales/setupLocale";
import {
  Document,
  Setting,
} from "@element-plus/icons-vue";
export default {
    path: "/async-menus",
    name: 'asyncMenus',
    component: Layout,
    order: 2,
    hidden: false,
    redirect: "/async-menus/asyncMenu1",
    meta: {
        title: $t('软件管理系统'),
        hideBreadcrumb: false,
        icon: Document
    },
    children: [
        {
          path: '/odf',
          component: () => import("@/views/iframeViews/index.vue"),
          name: 'odf',
          hidden: false,
          meta: {
            title: $t('订单软件管理'),
            icon: Setting,
            iframeUrl:'',
          }
        },
        {
          path: '/onpi',
          component: () => import("@/views/iframeViews/index.vue"),
          name: 'onpi',
          hidden: false,
          meta: {
            title: $t('量产软件发布'),
            icon: Setting,
            iframeUrl:'',
          }
        },
        {
          path: '/pilot',
          component: () => import("@/views/iframeViews/index.vue"),
          name: 'pilot',
          hidden: false,
          meta: {
            title: $t('试产软件发布'),
            icon: Setting,
            iframeUrl:'',
          }
        }
    ]
}