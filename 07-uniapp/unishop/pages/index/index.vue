<template>
	<view class="content">
		<!-- #ifdef MP -->
			<view class="mp-search-input">
				<input type="text" class="search-input" placeholder="请输入你要买的商品,如:苹果"/>
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
				<swiper-item @click="toDetailPage(index,item)" class="carouse-item" v-for="(item,index) in carousel_list" :key="index">
					<image :src="item.imgUrl"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图 end -->
		
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
				<view class="tip">10点场</view>
				<view class="timer">06</view>
				<view style="margin-right: 10rpx;">:</view>
				<view class="timer">34</view>
				<view style="margin-right: 10rpx;">:</view>
				<view class="timer">12</view>
			</view>
			<!-- 滚动视图 -->
			<scroll-view class="s-list" scroll-x="true">
				 <view class="s-wrapper">
					 <view v-for="(item,index) in seckill_list" :key="item.id" class="s-item">
						 <image :src="item.pro_image"></image>
						 <view class="title">{{item.name}}</view>
						 <view class="price">{{item.price}}</view>
					 </view>
				 </view>
			</scroll-view>
		</view>
		<!-- 限时秒杀 end -->
		
		<!-- 猜你喜欢 start -->
		<view class="like-title">
			<image src="../../static/home/h1.png" mode=""></image>
			<view class="like-box">
				<text>猜你喜欢</text>
				<text>Guess You Like</text>
			</view>
		</view>
		<!-- 内容 -->
		<view class="like-content">
			<view 
				v-for="(item,index) in like_list"
				:key="item.id"
				@click="navToDetailPage"
				class="like-item"
			>
				<image :src="item.small_image" mode=""></image>
				<text class="title">{{item.name}}</text>
				<text class="price">{{item.price}}</text>
			</view>
		</view>
		<!-- 猜你喜欢 end -->
	</view>
</template>

<script>
	import carousel from "../../pages/index/carousel_list.json"
	import category from "../../pages/index/category.json"
	import seckill from "../../pages/index/seckill.json"
	import like_list from "../../pages/index/like_list.json"
	export default {
		data() {
			return {
				carousel_list:carousel.data,
				category_list:category.data,
				seckill_list:seckill.data,
				like_list:like_list.data
			}
		},
		onLoad() {

		},
		methods: {
			toDetailPage(index,item){
				console.log(index)
			}
		}
	}
</script>

<style scoped lang="scss">
	/* #ifdef MP */
	.mp-search-input{
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(255,255,255,0.6);
		z-index: 9999;
		width: 100%;
		height: 80rpx;
		padding-left: 50rpx;
		.search-input{
			box-sizing: border-box;
			width: 650rpx;
			height: 60rpx;
			margin-top: 20rpx;
			border-radius: 40rpx;
			background-color: #fff;
			padding-left: 40rpx;
			border: 1px solid red;
		}
	}
	.carousel-section{
		padding-top: 100rpx;
	}
	/* #endif */
	
	// 轮播图
	.carousel-section{
		.carousel{
			width: 100%;
			height: 350rpx;
			.carouse-item{
				width: 100%;
				height: 100%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	//分类
	.cate-section{
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30rpx 0;
		.cate-item{
			width: 130rpx;
			height: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 24rpx;
			image{
				width: 90rpx;
				height: 90rpx;
				margin-bottom: 10rpx;
			}
		}
	}
	
	// 限时秒杀
	.seckill-section{
		padding: 4rpx 30rpx 20rpx;
		.s-header{
			display: flex;
			align-items: center;
			.s-img{
				width: 140rpx;
				height: 30rpx;
			}
			.tip{
				font-size: 28rpx;
				color: #999999;
				margin: 0 20rpx;
			}
			.timer{
				width: 40rpx;
				height: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: rgba($color: #000000, $alpha: 0.5);
				font-size: 28rpx;
				margin-right: 10rpx;
				border-radius: 6rpx;
				color: #FFFFFF;
			}
		}
		.s-list{
			margin: 20rpx 0;
			.s-wrapper{
				display: flex;
				.s-item{
					width: 300rpx;
					margin-right: 20rpx;
					display: flex;
					flex-direction: column;
					image{
						width: 250rpx;
						height: 220rpx;
						border-radius: 8rpx;
					}
					.title{
						width: 300rpx;
						font-size: 30rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.price{
						color: $uni-text-color-red;
						font-size: $uni-font-size-base;
					}
				}
			}
		}
	}
	
	// 猜你喜欢
	.like-title{
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx 10rpx;
		background-color: #efefef;
		image{
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
		}
		.like-box{
			flex: 1;
			display: flex;
			flex-direction: column;
			text{
				font-size: 30rpx;
				color: #e42208;
				line-height: 1.3;
			}
		}
	}
	.like-content{
		display: flex;
		flex-wrap: wrap;
		padding: 0 30rpx 80rpx;
		background-color: #efefef;
		justify-content: space-between;
		.like-item{
			box-sizing: border-box;
			display: flex;
			width: 48%;
			flex-direction: column;
			margin-top: 20rpx;
			background-color: #FFFFFF;
			padding: 20rpx;
			border-radius: 8rpx;
			image{
				width: 100%;
				height: 300rpx;
				border-radius: 8rpx;
			}
			.title{
				font-size: 30rpx;
				padding-bottom: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-top: 8rpx;
			}
			.price{
				font-size: 28rpx;
				color: $uni-text-color-red;
			}
		}
	}

</style>
