import Vue from 'vue'
import App from './App.vue'
import VueOffice from '../packages'

Vue.config.productionTip = false
Vue.use(VueOffice)

new Vue({
  render: h => h(App),
}).$mount('#app')
