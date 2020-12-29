<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price" >9.99</text>
		</view>
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon iconfont icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#e42208" :checked="payType == 1"></radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon iconfont icon-zhifubaozhifu"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
					<text>支付就用支付宝</text>
				</view>
				<label class="radio">
					<radio value="" color="#e42208" :checked="payType == 2"></radio>
				</label>
			</view>
			<text class="mix-btn" @click="confirm" >确认支付</text>
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
			changePayType(type){
				this.payType = type;
			},
			confire(){
				uni.redirectTo({
					url:""
				})
			}
		}
	}
</script>

<style>

</style>
