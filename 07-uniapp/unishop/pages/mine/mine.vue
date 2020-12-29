<template>
	<view class="mine">
		<!-- 用户版块 -->
		<view class="user-section">
			<image class="user-bg" src="/static/mine/mine_bg.png" mode=""></image>
			<!-- 用户头像 -->
			<view class="user-info">
				<image src="../../static/mine/normal_face.png" mode=""></image>
				<text>游客</text>
			</view>
			<!-- 会员 -->
			<view class="vip-card-box">
				<view class="title">
					<text class="iconfont icon-huiyuan-"></text>
					<view>黄金会员</view>
				</view>
				<view class="vip-button">
					立即开通
				</view>
			</view>
		</view>
		<view
		   class="cover-container"
		   :style="[{
			   transform: coverTransfrom,
			   transition: coverTransition
		   }]"
		   @touchstart="coverTouchstart"
		   @touchmove="coverTouchmove"
		   @touchend="coverTouchend"
		 >
			<image class="arc" src="/static/mine/arc.png" mode=""></image>
			<view class="us-section">
				<view class="us-item">
					<text>6666</text>
					<text>余额</text>
				</view>
				<view class="us-item">
					<text>6666</text>
					<text>积分</text>
				</view>
				<view class="us-item">
					<text>6666</text>
					<text>成长值</text>
				</view>
			</view>
		   <view class="total-section">
		   	<!-- 订单状态 -->
		   	<view class="order-section">
		   		<view class="order-item" @click="navTo('/pages/order/order')">
		   			<text class="iconfont icon-quanbudingdan"></text>
		   			<text>全部订单</text>
		   		</view>
		   		<view class="order-item"  @click="navTo('/pages/order/order')">
		   			<text class="iconfont icon-daifukuan01"></text>
		   			<text>待付款</text>
		   		</view>
		   		<view class="order-item"  @click="navTo('/pages/order/order')">
		   			<text class="iconfont icon-tubiaolunkuo-"></text>
		   			<text>待收货</text>
		   		</view>
		   		<view class="order-item"  @click="navTo('/pages/order/order')">
		   			<text class="iconfont icon-tuikuan"></text>
		   			<text>退款/售后</text>
		   		</view>
		   	</view>
		   	<!-- 列表部分 -->
		   	<view class="list-section">
		   		<list-cell icon="icon-collection" iconColor="#e9232c" title="我的收藏"></list-cell>
		   		<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
		   		<list-cell icon="icon-qianbao" iconColor="#c98932" title="我的钱包" tips="钱袋子鼓鼓的"></list-cell>
		   		<list-cell icon="icon-fenxiang" iconColor="#9789f7" title="分享" tips="邀请好友赢更多大礼"></list-cell>
		   		<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
		   	</view>
		   </view>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell.vue'
	let startY = 0, moveY = 0, pageAtTop = true;
	export default {
		data(){
			return {
				coverTransfrom: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				hasLogin:true
			}
		},
		computed:{
		},
		components:{
			listCell
		},
		methods:{
			dealClick(){
				uni.showModal({
					content: '点我干嘛?',
					success: (e) => {
						console.log(e);
					}
				})
			},
			// 跳转
			navTo(url){
				// 判断是否登录
				if(!this.hasLogin){
					url = '/pages/login/login';
				}
				// console.log(url);
				uni.navigateTo({
					url
				})
			},
			coverTouchstart(e){
				// console.log('开始触摸');
				// 判断
				if(pageAtTop === false){
					return;
				}
				
				// 设置过渡效果
				this.coverTransition = 'transfrom .1s linear';
				// 记录起始点
				startY = e.touches[0].clientY;
				// console.log(startY);
				
			},
			coverTouchmove(e){
				console.log('移动触摸');
				moveY =  e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				console.log(moveDistance);
				// 判断
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
				
				if(moveDistance >0 && moveDistance <= 80){
					this.coverTransfrom = `translateY(${moveDistance}px)`;
				}
				
			},
			coverTouchend(e){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(0.21, 1.93, 0.53, 0.64)';
				this.coverTransfrom = `translateY(0px)`;
			}
		}
	}
</script>

<style lang="scss">
	
	%section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
		border-radius: 10rpx;
	}
	
	%flex-center{
		display: flex;
		flex-direction: column;
        justify-content: center;
		align-items: center;
	}
	
	
	page, .mine{
		width: 100%;
		height: 100%;
	}
	
	.user-section{
		width: 100%;
		height: 500rpx;
		position: relative;
		padding: 100rpx 30rpx 0;
		.user-bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
		.user-info{
			z-index: 1;
			position: relative;
			display: flex;
			align-items: center;
			image{
				width: 130rpx;
				height: 130rpx;
				border: 6rpx solid #fff;
				border-radius: 50%;
			}
			text{
				font-size: 36rpx;
				color: #303030;
				margin-left: 20rpx;
			}
		}
		.vip-card-box{
			box-sizing: border-box;
			position: relative;
			height: 440rpx;
			width: 690rpx;
			margin-top: 20rpx;
			padding: 20rpx 40rpx;
			background: linear-gradient(left, rgba(0,0,0,.6),  rgba(0,0,0,.8));
			border-radius: 20rpx 20rpx 0 0;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			.title{
				.iconfont{
					margin-right: 10rpx;
				}
				color: #d3d60d;
				display: flex;
				align-items: center;
			}
			.vip-button{
				width: 130rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				border-radius: 10rpx;
				background: linear-gradient(left,  #f9e6af, #ffd465);
				color:#36343c;
				font-size: 22rpx;
				
			}
		}
	}
	
	.cover-container{
		background-color: #F8F8F8;
		position: relative;
		margin-top: -200rpx;
		.arc{
			position: absolute;
			left: 0;
			top: -32rpx;
			width: 100%;
			height: 35rpx;
		}
		.us-section{
		    @extend %section;
			margin:40rpx 30rpx 20rpx;
			.us-item{
				@extend  %flex-center;
				width: 120rpx;
				height: 120rpx;
				font-size: 30rpx;
			}
		}
	}
	
	.total-section{
		background-color: #F8F8F8;
		width: 100%;
		height: 100%;
	}
	
	.list-section{
		border-radius: 10rpx;
		padding-top: 40rpx;
		margin:0 30rpx 20rpx;
	}
	
	.order-section{
		border-radius: 10rpx;
		padding-top: 40rpx;
		margin:0 30rpx 0;
		height: 150rpx;
		display: flex;
		.order-item{
			flex: 1;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text{
				font-size: 30rpx;
			}
			.iconfont{
				font-size: 60rpx;
			}
		}
	}
</style>
