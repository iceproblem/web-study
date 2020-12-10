// 引入Vue
import Vue from 'vue'

// let App = require("./App")  Node中的写法

// ES6中的写法
import App from './App.vue'

// 百度
Vue.config.productionTip = false

// 引入中路由模块
import router from "./routes/router";

// 根组件
new Vue({
  // 就意味着，当前的根组件和根组件对应的所有子组件都可以使用路由模块了
  router, // 在创建根组件时，挂载路由模块，它内部会把这个路由模块，混入到它的所有子组件中
  // render: h => h(App),  渲染App组件
  render: h => h(App),
}).$mount('#app')
