import { createApp } from 'vue';
import './style.css';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);
app.use(Antd).mount('#app');