import './assets/main.css'
// 引入windi css
import '@/plugins/unocss'
// 引入全局样式
import '@/styles/index.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import microApp from '@micro-zoe/micro-app'


microApp.start({
    lifeCycles: {
        created() {
            console.log('created 全局监听')
        },
        beforemount() {
            console.log('beforemount 全局监听')
        },
        mounted() {
            console.log('mounted 全局监听')
        },
        unmount() {
            console.log('unmount 全局监听')
        },
        error() {
            console.log('error 全局监听')
        }
    }

})
const app = createApp(App)
app.use(createPinia()).use(router).mount('#app')
