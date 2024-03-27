import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import routes from "@/routes";

const app = createApp(App)
app.use(routes)
app.use(ElementPlus)
app.mount('#app')
