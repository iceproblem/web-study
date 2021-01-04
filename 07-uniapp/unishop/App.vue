<script>
	import {mapMutations} from 'vuex'
	export default {
		methods:{
			...mapMutations(["login"])
		},
		onLaunch: function() {
			// console.log('App Launch')
			// 处理自动登录
			let userInfo = uni.getStorageSync("appUserInfo") || ''
			if(userInfo.token){
				this.login(userInfo); // 把本地的用户信息重新存储在vuex中
			}
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	
	/*每个页面公共css */
	@import url("./static/font/lmicon.css");
</style>
