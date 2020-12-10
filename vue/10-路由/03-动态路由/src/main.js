import Vue from 'vue'
import App from './App'
Vue.config.productionTip =false
import router from "./routes/router"

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')