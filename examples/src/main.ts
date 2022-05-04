import { createApp } from 'vue'
import TgIcon from '@tg-ui/components/icon'
import App from './App.vue'
import '@tg-ui/theme-chalk/src/index.scss'

const app = createApp(App)
app.use(TgIcon)
app.mount('#app')
