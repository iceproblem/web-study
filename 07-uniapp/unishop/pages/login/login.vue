<template>
	<view class="container">
		<view class="back-btn iconfont icon-zuojiantou-copy" @click="navBack"></view>
		<view class="wrapper">
			<view class="wrapper-icon">
				<image src="../../static/login/login.png" mode="aspectFit"></image>
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号机</text>
					<input type="number" :value="phone" placeholder="请输入手机号码" maxlength="11" @input="inputChange">
				</view>
				<view class="input-code">
					<text class="tit">验证码</text>
					<input type="number" :value="code" placeholder="6位数学组合" maxlength="6" @input="inputChange1">
					<button v-if="!countDown" type="default" class="code-btn" @click="getCode">获取验证码</button>
					<button v-else disabled="true" type="default" class="code-btn">已发送{{countDown}}</button>
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin">登录</button>
		</view>
	</view>
</template>

<script>
	import { getPhoneCode,phoneCodeLogin } from "@/api/index.js"
	import { mapMutations } from "vuex"
	export default {
		data() {
			return {
				phone:"",// 手机号码
				code:"", // 验证码
				countDown:0 // 倒计时
			}
		},
		methods: {
			...mapMutations(['login']),
			// 获取验证码
			async getCode(){
				let isPhoneOk = /^1[3456789]\d{9}$/.test(this.phone);
				if(!isPhoneOk){
					this.$msg("手机号码不正确");
					return; // 结束函数调用
				}
				// 开始倒计时
				this.countDown = 60;
				/* let a = setInterval(()=>{
					this.countDown--;
					if(this.countDown === 0){
						clearInterval(a)
					}
				},1000) */
				// this表示当前组件对象 
				this.intervalId = setInterval(()=>{
					this.countDown--;
					if(this.countDown === 0){
						clearInterval(this.intervalId)
					}
				},1000)
				
				// 发起ajax请求，来获取验证码
				// 问：使用我们之前封装的ajax可以吗？
				// 答：不行 因为uniapp框架中自带发送ajax的api
				let result = await getPhoneCode(this.phone)
				// console.log(result)
				if(result.status === 1){
					this.$msg(`验证码：${result.data.code}【旺财买菜】`,5000)
				}else{
					this.$msg(result.msg)
				}
			},
			inputChange(e){
				// console.log(e)
				this.phone = e.detail.value
			},
			inputChange1(e){
				// console.log(e)
				this.code = e.detail.value
			},
			// 实现登录
			async toLogin(){
				if(!this.phone.trim()){
					this.$msg("请输入手机号")
					return;
				}else if(!/^1[3456789]\d{9}$/.test(this.phone)){
					this.$msg("请输入正确手机号")
					return;
				}
				
				if(!this.code.trim()){
					this.$msg("请输入验证码")
					return;
				}else if(!/^\d{6}$/.test(this.code)){
					this.$msg("请输入6位数字验证码")
					return;
				}
				
				// 验证OK
				let result = await phoneCodeLogin(this.phone,this.code);
				// console.log(result);
				if(result.status === 1){
					// 0）提示登录成功
					this.$msg(result.msg)
					// 1）把用户信息存储在vuex  在vuex中，它又把用户信息存储在本地
					this.login(result.data)
					// 2）哪里来回哪里去
					uni.navigateBack()
				}else{
					this.$msg(result.msg)
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: rgb(228, 34, 7);
		width: 100%;
		height: 100%;
	}

	.container {
		padding-top: 180rpx;
		position: relative;
		overflow: hidden;
		background: rgb(228, 34, 7);
	}

	.wrapper {
		margin-top: -50rpx;
		position: relative;
		z-index: 90;
		background: rgb(228, 34, 7);
		padding-bottom: 40upx;

		.wrapper-icon {
			width: 500rpx;
			height: 500rpx;
			margin: 0 auto 40rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		top: 40upx;
		font-size: 40upx;
		color: #303133;
	}


	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: rgba($color:#fff, $alpha: .8);
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 30rpx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: rpx;
			line-height: 56upx;
			font-size: 30upx;
			color: #000000;
		}

		input {
			height: 60upx;
			font-size: 30rpx;
			color: #75a342;
			width: 100%;
		}
	}

	.input-code {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 30upx;
		background: rgba($color:#fff, $alpha: .8);
		height: 120upx;
		border-radius: 4px;
		margin-bottom: rpx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: rpx;
			line-height: rpx;
			font-size: 30upx;
			color: #000000;
			margin-right: 10rpx;
		}

		input {
			height: 60upx;
			font-size: 30rpx;
			color: #75a342;
			flex: 1;
		}

		.code-btn {
			font-size: 30rpx;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: #fff;
		color: #000;
		font-size: 32upx;

		&:after {
			border-radius: 100px;
		}
	}
</style>

