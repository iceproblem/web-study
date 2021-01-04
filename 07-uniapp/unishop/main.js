import Vue from 'vue'
import App from './App'
import store from "./store/index.js"

Vue.config.productionTip = false

let msg = (title,duration=1500,mask=false,icon="none")=>{
	// 手机号不正确
	uni.showToast({
	    title,
	    duration,
		mask,
		icon
	});
}

App.mpType = 'app'
// 把上面的msg挂载到vue的原型上面
Vue.prototype.$msg = msg; // this.$msg("手机号码不正确")

const app = new Vue({
    ...App,
	store
})
app.$mount()
