<template>
	<view class="container">
		<!-- 轮播图start -->
		<view class="carousel">
			<swiper
				indicator-dots
				circular="true"
				duration="400"
				autoplay
			>
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item.src" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图end -->
		
		<!-- 商品信息 start -->
		<view class="introduce-section">
			<text class="title">喜之郎果冻什锦蜜桔大果冻200克*10杯果肉果冻大杯儿童布丁大礼包</text>
			<view class="price-box">
				<text class="price-tip">￥</text>
				<text class="price">4.5</text>
				<text class="m-price">￥5</text>
				<text class="coupon-tip">9折</text>
			</view>
			<view class="bot-row">
				<text>销量：10000</text>
				<text>库存：123456</text>
				<text>浏览器：7654</text>
			</view>
			<view class="c-list">
				<view class="c-row b-b">
					<view class="tit">服务</view>
					<view class="bz-list con">
						<text>2小时发货</text>
						<text>假一赔十</text>
						<text>次日达</text>
					</view>
				</view>
			</view>
			<!-- 分享 -->
			<view class="share-section" @click="share">
				<text class="tit">该商品分享可获取20积分</text>
				<view class="share-btn">立即分享</view>
			</view>
			<!-- 商品的图文详情 -->
			<view class="detail-desc">
				<view class="d-header">
					<text>图文详情</text>
				</view>
				<rich-text :nodes="desc"></rich-text>
			</view>
			<!-- 底部菜单操作 -->
			<view class="page-bottom">
				<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
					<text class="iconfont icon-shouye"></text>
					<text>首页</text>
				</navigator>
				<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
					<text class="iconfont icon-gouwucheman"></text>
					<text>购物车</text>
				</navigator>
				<view class="action-btn-group">
					<button type="primary" class="action-btn no-border buy-now-btn" @click="buy">立即购买</button>
					<button type="primary" class="action-btn no-border add-cart-btn">加入购物车</button>
				</view>
			</view>
			<share :shareList="shareList" ref="share" :contentHeight="300"></share>
		</view>
		<!-- 商品信息 end -->
	</view>
</template>

<script>
	import share from '@/components/share.vue'
	export default {
		components:{
			share
		},
		data(){
			return {
				// 轮播图列表
				imgList: [
					{src: 'http://img.alicdn.com/imgextra/i2/164/O1CN01fyVGZS1D59ZKdxjPk_!!164-0-lubanu.jpg_760x760Q50s50.jpg'},
					{src: 'http://img.alicdn.com/imgextra/i3/725677994/O1CN01lCW2sX28vIir5R1YD_!!725677994.jpg_760x760Q50s50.jpg'},
					{src: 'http://img.alicdn.com/imgextra/i3/725677994/TB2Y1zGo0bJ8KJjy1zjXXaqapXa_!!725677994.jpg_760x760Q50s50.jpg'}
				],
				// 分享内容
				shareList: [
					{
						type: 1,
						icon: '/static/share/share_wechat.png',
						text: '微信好友'
					},
					{
						type: 2,
						icon: '/static/share/share_moment.png',
						text: '朋友圈'
					},
					{
						type: 3,
						icon: '/static/share/share_qq.png',
						text: 'QQ好友'
					},
					{
						type: 4,
						icon: '/static/share/share_qqzone.png',
						text: 'QQ空间'
					}
				],
				desc: `
					<div style="width:100%">
						<img style="width:100%;display:block;" src="http://img.alicdn.com/imgextra/i4/728367922/O1CN01jH8Q4z28OK6tjzWw9_!!728367922-0-scmitem6000.jpg_760x760Q90s50.jpg" />
						<img style="width:100%;display:block;" src="http://img.alicdn.com/imgextra/i2/728367922/O1CN01iEShOy28OK6tB1LeE_!!728367922-0-scmitem6000.jpg_760x760Q90s50.jpg" />
						<img style="width:100%;display:block;" src="http://img.alicdn.com/imgextra/i4/728367922/O1CN01JiHcSj28OK6tAzsBQ_!!728367922-0-scmitem6000.jpg" />
						<img style="width:100%;display:block;" src="http://img.alicdn.com/imgextra/i2/728367922/O1CN01DHTfPv28OK6wBP6dr_!!728367922-0-scmitem6000.jpg" />
						<img style="width:100%;display:block;" src="http://img.alicdn.com/imgextra/i4/728367922/O1CN01xyhHkH28OK6wBQeF2_!!728367922-0-scmitem6000.jpg" />
						<img style="width:100%;display:block;" src="http://img.alicdn.com/imgextra/i2/728367922/O1CN01RiDvoQ28OK6wBOAR8_!!728367922-0-scmitem6000.jpg" />
					</div>
				`
			}
		},
		methods: {
			// 弹出分享面板
			share(){
			   this.$refs.share.toggleMask();	
			},
			buy(){
				
			}
		}
	}
</script>

<style lang='scss'>
	page{
		background: #F5F5F5;
		padding-bottom: 160rpx;
	}
    /* 滚动轮播图 */  
	.carousel {
		height: 722rpx;
		position:relative;
		swiper{height: 100%;}
		.image-wrapper{width: 100%;height: 100%;}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {width: 100%;height: 100%;}
		}
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20rpx 30rpx;
		.title{
			font-size: 32rpx;
			color: #303133;
			height: 50upx;
			line-height: 50upx;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:#e42208;
		}
		.price{
			font-size: 34rpx;
		}
		.m-price{
			margin:0 12upx;
			color: #909399;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background:#e42208;
			font-size: 24upx;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-3rpx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: 24upx;
			color: #909399;
			text{
				flex: 1;
			}
		}
	}
	
	/* 商品参数列表 */
	.c-list{
		margin-top: 10rpx;
		font-size: 28rpx;
		color: #606266;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: #303133;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: 26upx;
			color: #303133;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: #303133;
			line-height: 40upx;
		}
		.red{
			color: #fa436a;
		}
	}
	
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: #606266;
		background: #d8f9cd;
		padding: 12upx 30upx;
		.tit{
			font-size: 30rpx;
			margin-left:10upx;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: 30rpx;
			color: #75a342;
		}
	}
	
	
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: 26rpx;
			color: #303133;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
	}
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 24upx;
			color: #606266;
			width: 96upx;
			height: 80upx;
			.iconfont{
				font-size: 40upx;
				line-height: 48upx;
				color: #909399;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #e42208;
			box-shadow: 1px 2px 5px rgba(79, 211, 79, 0.4);
			background: linear-gradient(to right, #e42208,#e42208,#e42208);
			margin-left: 20upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: 28upx;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
</style>