import { Layout } from '@/router/layout'
import { $t } from '@/plugins/locales/setupLocale'
import { Document } from '@element-plus/icons-vue'
export default {
  path: '/vue-app',
  name: 'vueApp',
  component: Layout,
  order: 4,
  hidden: false,
  redirect: '/vue-app/vue-app-home',
  meta: {
    title: $t('Vue应用'),
    hideBreadcrumb: false,
    icon: Document
  },
  children: [
    {
      path: '/vue-app-home',
      component: () => import('@/views/vueApp/home.vue'),
      name: 'vueAppHome',
      hidden: false,
      meta: {
        title: $t('Vue应用入口'),
        icon: Document
      }
    }
  ]
}
