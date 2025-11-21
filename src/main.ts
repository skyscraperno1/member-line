import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'
import Vant from 'vant'
import 'vant/lib/index.css'

createApp(App).use(i18n).use(Vant).mount('#app')
