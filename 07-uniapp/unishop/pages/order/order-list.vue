<!-- 商品列表组件 <order-list :list="xx"></order-list> -->
<template>
	<view class="order-list">
		<view :id="'order'+order.id" class="order-li" v-for="order in list" :key="order.id">
			<!-- 订单的头部 -->
			<view class="order-top">
				<text class="time">{{order.time}}</text>
			</view>
			<!-- 订单中间 -->
			<!-- 多件商品 -->
			<scroll-view v-if="order.goodsList.length > 1" class="goods-box" scroll-x>
				<view
				 class="goods-item"
				 v-for="(goodsItems, goodsIndex) in order.goodsList" 
				 :key="goodsIndex"
				  >
					<image class="goods-img" :src="goodsItems.small_image" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<!-- 单件商品 -->
			<view 
			  v-if="order.goodsList.length === 1"
			  class="goods-box-single"
			  v-for="(goodsItems, goodsIndex) in order.goodsList"
			  :key="goodsIndex"
			>
				<image class="goods-img" :src="goodsItems.small_image" mode="aspectFill"></image>
				<view class="right">
					<text class="title">{{goodsItems.goods_name}}</text>
					<text class="attr"> X  {{goodsItems.num}}</text>
					<text class="price">¥{{goodsItems.goods_price}}</text>
				</view>
			</view>
			<!-- 订单尾部 -->
			<view class="order-bottom">
				<view class="price-box">
					共
					<text class="num">{{order.goodsList.length}}</text>
					件商品 实付款
					<text>¥{{order.shop_price}}</text>
				</view>
				<view class="action-box" v-if="order.state === 1">
					<button class="action-btn" @click="cancelOrder(order.id)">取消订单</button>
					<button class="action-btn pay" @click="toPay(order.shop_price, order.id)">立即支付</button>
				</view>
				<view class="action-box" v-if="order.state === 2">
					<button class="action-btn pay">确认收货</button>
				</view>
				<view class="action-box" v-if="order.state === 3">
					<button class="action-btn pay">去评价</button>
				</view>
				<view class="action-box" v-if="order.state === 4">
					<button class="action-btn pay">联系客服</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {deleteOrder} from '@/api/index.js'
	import {mapState} from 'vuex'
	export default {
		props:{
			list: {
				type: Array,
				default(){
					return []
				}
			}
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods:{
			async cancelOrder(orderId){
				let result = await deleteOrder(this.userInfo.token, orderId);
				if(result.status === 1){
					this.$emit('reloadData');
				}else{
					this.$msg(result.msg, 500);
				}
			},
			toPay(orderTotal, order_id){
				uni.redirectTo({
					url:`/pages/pay/pay?total=${orderTotal}&orderid=${order_id}`
				});
			}
		}
	}
</script>

<style lang="scss">
	page,
	.order-list{
		background-color: #F8F8F8;
		height: 100%;
		.order-li{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			padding: 20upx;
			border-bottom: 1upx solid #eee;
			border-bottom: 1upx solid #eee;
			.order-top{
				.time{
					color: #555555;
					font-size: 28rpx;
					padding: 80rpx 20rpx 20rpx;
				}
			}
			// 多件商品
			.goods-box{
			   display: flex;
			   white-space: nowrap;
			   padding: 20rpx 0;
			   height: 160rpx; 
			   .goods-item{
				   width: 120rpx;
				   height: 120rpx;
				   margin-right: 24rpx;
				   display: inline-block;
				   .goods-img{
					   width: 100%;
					   height: 100%;
				   }
			   }
			}	
			// 单件商品
			.goods-box-single{
				display: flex;
				padding: 20rpx 0;
				.goods-img{
					width:240rpx;
					height: 240rpx;
					margin-right: 10rpx;
				}
				.right{
					display: flex;
					flex-direction: column;
					justify-content: center;
					font-size: 28rpx;
					.attr{
						color: #808080;
					}
					.price{
						color: #E9232C;
					}
				}
			}
			.order-bottom{
				display: flex;
				flex-direction: column;
				.price-box{
					padding: 20rpx 0;
					text-align: right;
					color: #999999;
					font-size: 28rpx;
					text{
						color: #E9232C;
						padding: 0 4rpx;
					}
				}
				.action-box{
				   display: flex;
				   justify-content: flex-end;
				   .action-btn{
					   width: 160prx;
					   height: 60rpx;
					   line-height: 60rpx;
					   margin: 0;
					   margin-left: 20rpx;
					   font-size: 26rpx;
					   background-color: #E9232C;
					   border: none;
					   border-radius: 30rpx;
					   color: #fff;
					   &.pay{
						   background-color: #23c33b;
					   }
				   }
				}
			}
		}
	}
</style>
