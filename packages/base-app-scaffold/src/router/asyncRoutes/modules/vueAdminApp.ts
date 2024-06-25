import { Layout } from '@/router/layout'
import { $t } from '@/plugins/locales/setupLocale'
import { Document } from '@element-plus/icons-vue'
export default {
  path: '/vue-admin-app',
  name: 'vueAdminApp',
  component: Layout,
  order: 4,
  hidden: false,
  redirect: '/vue-admin-app/vue-admin-app-home',
  meta: {
    title: $t('Vue Admin应用'),
    hideBreadcrumb: false,
    icon: Document
  },
  children: [
    {
      path: '/vue-admin-app-home',
      component: () => import('@/views/vueAdminApp/home.vue'),
      name: 'vueAdminAppHome',
      hidden: false,
      meta: {
        title: $t('Vue Admin应用入口'),
        icon: Document
      }
    }
  ]
}
