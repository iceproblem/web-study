<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{total}}</text>
		</view>
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon iconfont icon-weixinzhifu" style="color: purple;"></text>
				<view class="con">
					<text class="tit">余额支付</text>
					<text>推荐余额支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#75a342" :checked='payType == 1' >
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="icon iconfont icon-weixinzhifu" style="color: purple;"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#75a342" :checked="payType == 2"></radio>
				</label>
			</view>
			<view class="type-item b-b"  @click="changePayType(3)">
				<text class="icon iconfont icon-zhifubaozhifu"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#75a342" :checked="payType == 3"></radio>
				</label>
			</view>
		</view>
		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
    import { mapState} from 'vuex'
	import {payOrderWithCount} from '@/api/index.js'
	export default {
		data() {
			return {
				payType: 1,
				orderInfo: {},
				total: null,
				orderid: null
			};
		},
		computed:{
			...mapState(["hasLogin", "userInfo"])
		},
		onLoad(options) {
			if(!this.hasLogin){
				uni.navigateTo({
					url: "/pages/login/login"
				})
				return;
			}
			
			this.total = JSON.parse(decodeURIComponent(options.total));
			this.orderid = JSON.parse(decodeURIComponent(options.orderid));
		},

		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			async confirm() {
				if(this.payType === 1){ // 账户余额支付
				    uni.showLoading({
				    	title: '正在创建支付!'
				    })
					let result = await payOrderWithCount(this.userInfo.token, this.orderid, this.total);
					if(result.status === 1){
						uni.hideLoading();
						uni.redirectTo({
							url: '/pages/pay/paySuccess'
						}) 
					}else{
						this.$msg(result.msg);
					}
				}else if(this.payType === 2){ // 微信支付
				   this.$msg('微信支付');
				}else if(this.payType === 3){ // 支付宝支付
					this.$msg('支付宝支付');
				}
			},
		}
	}
</script>

<style lang="scss">
.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-zhifubaozhifu {
			color: #01aaef;
		}
		.tit{
			font-size: 32upx;
			color: #303133;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: 24upx;
			color: #909399;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: 32upx;
		color: #fff;
		background-color: #e42208;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(170, 255, 127, 0.4);
	}

</style>