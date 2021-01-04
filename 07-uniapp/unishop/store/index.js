import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{
		hasLogin:false,  // 是否登录
		userInfo:{}  // 用户信息  很多页面都要使用用户信息数据，所以就把用户信息放到vuex中
	},
	getters:{
		
	},
	mutations:{
		// 如果用户登录成功，要commit这个login mutation
		login(state,userInfo){
			state.hasLogin = true;
			state.userInfo = userInfo;
			// 为什么需要把用户信息进行持久化？
			// 答：vue中的数据还是存储在内存中的，一刷新，用户vuex中的用户信息没了，我们需要对用户信息进行持久化，
			// 如果存储在localstoreage中，这个数据就一直存在了。
			uni.setStorage({
				key:"appUserInfo",
				data:userInfo
			})
		},
		// 当用户退出登录时，需要commit 这引mutation
		logout(state){
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key:"appUserInfo"
			})
		}
	},
	actions:{
		
	}
})
export default store;




























