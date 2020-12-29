<template>
	<view class="container">
		<view class="back-btn iconfont icon-zuojiantou-copy"></view>
		<view class="wrapper">
			<view class="wrapper-icon">
				<image src="../../static/login/login.png" mode=""></image>
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="number" :value="phone" placeholder="请输入手机号码" maxlength="11" @input="inputChange">
				</view>
				<view class="input-code">
					<text class="tit">验证码</text>
					<input type="number" :value="code"  />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
