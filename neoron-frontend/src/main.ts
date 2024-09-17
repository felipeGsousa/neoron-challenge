import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue'

createApp(App)
.use(router)
.use(Antd)
.use(store)
.mount('#app')
