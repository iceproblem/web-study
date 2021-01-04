<template>
	<view class="content">
		 <!-- #ifdef MP -->
			 <view class="mp-search-box">
				<input type="text" class="search-input" placeholder="请输入你要买的商品,如:苹果">
			 </view>
		 <!-- #endif -->
		 
		 <!-- 轮播图 start -->
		 <view class="carousel-section">
			 <swiper
				class="carousel"
				:indicator-dots="true"
				:autoplay="true"
				:interval="2000"
				:duration="600"
				indicator-active-color="#ffff"
				circular
			 >
				 <swiper-item @click="navToDetailPage(index,item)" class="carousel-item" v-for="(item,index) in carousel_list" :key="index">
					 <image :src="item.icon_url"></image>
				 </swiper-item>
			 </swiper>
		 </view>
		 <!-- 轮播图 start -->
		 
		 <!-- 分类 start -->
		 <view class="cate-section">
			 <block v-for="(item,index) in category_list" :key="index">
				 <view class="cate-item">
					 <image :src="item.icon_url"></image>
					 <text>{{item.name}}</text>
				 </view>
			 </block>
		 </view>
		 <!-- 分类 end -->
		 
		 <!-- 限时秒杀 start -->
		 <view class="seckill-section">
			 <view class="s-header">
				 <image src="../../static/home/secskill-img.jpg" class="s-img"></image>
				 <text class="tip">10点场</text>
				 <text class="timer">06</text>
				 <text style="margin-right: 10rpx;">:</text>
				 <text class="timer">34</text>
				 <text style="margin-right: 10rpx;">:</text>
				 <text class="timer">12</text>
			 </view>
			 <!-- 滚动视图 -->
			 <scroll-view class="s-list" scroll-x="true">
				 <view class="s-wrapper">
					 <view v-for="(item,index) in seckill_list" :key="item.id" class="s-item">
						 <image :src="item.small_image"></image>
						 <view class="title">{{item.name}}</view>
						 <view class="price">{{item.price}}</view>
						 <!-- 购物车图标 -->
						 <view class="common-cart s-cart" @click.stop="addToCart(item)">
							 <text class="iconfont icon-gouwucheman" style="font-size: 50rpx; color: #e42208; position:relative; left:-60rpx;"></text>
						 </view>
					 </view>
				 </view>
			 </scroll-view>
		 </view>
		 <!-- 限时秒杀 end -->
		 
		 <!-- 猜你喜欢 start -->
		 <view class="like-title">
			 <image src="../../static/home/h1.png"></image>
			 <view class="like-box">
				 <text>猜你喜欢</text>
				 <text>Guess You Like</text>
			 </view>
		 </view>
		 <view class="like-content">
			 <view
				v-for="(item,index) in like_list"
				:key="item.id"
				@click="navToDetailPage"
				class="like-item"
			 >
				 <image :src="item.small_image"></image>
				 <text class="title">{{item.name}}</text>
				 <text class="price">{{item.price}}</text>
				 <!-- 购物车图标 -->
				 <view class="common-cart s-cart"  @click.stop="addToCart(item)">
				 	<text class="iconfont icon-gouwucheman" style="font-size: 50rpx; color: #e42208;"></text>
				 </view>
			 </view>
		 </view>
		 <!-- 猜你喜欢 end -->
		 
	</view>
</template>

<script>
	
	import { getHomeData,addGoodsToCart } from "@/api/index.js"
	import { mapState } from "vuex"
	
	export default {
		data() {
			return {
				carousel_list:[],
				category_list:[],
				seckill_list:[],
				like_list:[]
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		onLoad() {
			this.getHomeList()
		},
		methods: {
			async getHomeList(){
				let result = await getHomeData();
				// console.log(result);
				if(result.status === 1){
					this.carousel_list = result.data.carousel_list;
					this.category_list = result.data.cate_list;
					this.seckill_list = result.data.second_list;
					this.like_list = result.data.like_list;
				}
			},
			navToDetailPage(index,item){
				uni.navigateTo({
					url:"/pages/detail/detail"
				})
			},
			async addToCart(goods){
				// console.log(goods);
				// 判断用户是否登录
				if(!this.hasLogin){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
				// 把商品加入到购物车
				let {token} = this.userInfo;
				let result = await addGoodsToCart(token, goods.id, goods.name, goods.buy_limit, goods.price, goods.small_image);
				// console.log(result);
				if(result.status === 1){
					this.$msg("成功加入购物车")
				}else{
					this.$msg("加入购物车失败")
				}
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef MP */
	.mp-search-box {
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba($color:#C7F2B2, $alpha: 0.6);
		z-index: 9999;
		width: 100%;
		height: 100rpx;
		padding-left: 50rpx;

		.search-input {
			box-sizing: border-box;
			width: 650rpx;
			height: 80rpx;
			margin-top: 10rpx;
			border-radius: 40rpx;
			background-color: #FFFFFF;
			padding-left: 40rpx;
		}
	}

	.carousel-section {
		padding-top: 100rpx;
	}

	/* #endif */

	// 轮播图
	.carousel-section {
		.carousel {
			width: 100%;
			height: 350rpx;

			.carousel-item {
				width: 100%;
				height: 100%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	// 样式
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30rpx 0;

		.cate-item {
			width: 130rpx;
			height: 150rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			flex-direction: column;

			image {
				width: 90rpx;
				height: 90rpx;
				margin-bottom: 10rpx;
			}
		}
	}

	// 限时秒杀
	.seckill-section {
		padding: 4rpx 30rpx 20rpx;

		.s-header {
			display: flex;
			align-items: center;

			.s-img {
				width: 140rpx;
				height: 30rpx;
			}

			.tip {
				font-size: 28rpx;
				color: #999999;
				margin: 0 20rpx;
			}

			.timer {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 40rpx;
				height: 40rpx;
				background-color: rgba($color: #000000, $alpha: 0.5);
				font-size: 28rpx;
				margin-right: 10rpx;
				border-radius: 6rpx;
				color: #FFFFFF;
			}
		}

		.s-list {
			margin: 20rpx 0;

			.s-wrapper {
				display: flex;

				.s-item {
					width: 300rpx;
					// background-color: red;
					margin-right: 20rpx;
					display: flex;
					flex-direction: column;
					position: relative;
					padding-bottom: 30rpx;
					padding-right: 20rpx;

					image {
						width: 250rpx;
						height: 220rpx;
					}

					.title {
						// background-color: red;
						width: 300rpx;
						font-size: 30rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.price {
						color: $uni-text-color-red;
						font-size: $uni-font-size-base;
					}
				}
			}
		}
	}

	// 猜你喜欢
	.like-title {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx 10rpx;
		background-color: #efefef;

		image {
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}

		.like-box {
			flex: 1;
			display: flex;
			flex-direction: column;

			text {
				font-size: 30rpx;
				color: #75A342;
				line-height: 1.3;
			}
		}
	}

	// 猜你喜欢-内容
	.like-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30rpx 80rpx;
		background-color: #efefef;

		.like-item {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			margin-top: 20rpx;
			width: 48%;
			background-color: #fff;
			padding: 20rpx;
			position: relative;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}

			image {
				width: 100%;
				height: 300rpx;
			}

			.title {
				font-size: 30rpx;
				padding-bottom: 10rpx;
			}

			.price {
				color: $uni-text-color-red;
				font-size: 28rpx;
			}
		}
	}
	
	.common-cart{
		width: 60rpx;
		height: 60rpx;
	}
	
	.like-cart{
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
	}
	
	.s-cart{
		position: absolute;
		right: 5rpx;
		bottom: 10rpx;
	}
</style>
