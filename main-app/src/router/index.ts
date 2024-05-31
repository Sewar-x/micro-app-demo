import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/AboutView.vue')
    },
    {
      path: '/react',
      name: 'react-app',
      component: () => import('../views/ReactApp.vue')
    },
    {
      path: '/vue',
      name: 'vue-app',
      component: () => import('../views/VueApp.vue')
    }
  ]
})

export default router
