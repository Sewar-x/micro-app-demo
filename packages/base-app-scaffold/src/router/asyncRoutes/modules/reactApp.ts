import { Layout } from '@/router/layout'
import { $t } from '@/plugins/locales/setupLocale'
import { Document } from '@element-plus/icons-vue'
export default {
  path: '/react-app',
  name: 'reactApp',
  component: Layout,
  order: 5,
  hidden: false,
  redirect: '/react-app/react-app-home',
  meta: {
    title: $t('React应用'),
    hideBreadcrumb: false,
    icon: Document
  },
  children: [
    {
      path: '/react-app-home',
      component: () => import('@/views/reactApp/home.vue'),
      name: 'reactAppHome',
      hidden: false,
      meta: {
        title: $t('React应用入口'),
        icon: Document
      }
    }
  ]
}
