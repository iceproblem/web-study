<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('/pages/set/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more iconfont icon-youjiantou"></text>
		</view>
		<view class="list-cell" @click="navTo('实名认证')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">实名认证</text>
			<text class="cell-more iconfont icon-youjiantou"></text>
		</view>
		<view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch checked color="#e42208" @change="switchChange" />
		</view>
		<view class="list-cell b-b m-t" @click="navTo('清除缓存')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-more iconfont icon-youjiantou"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('关于我的')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于我的</text>
			<text class="cell-more iconfont icon-youjiantou"></text>
		</view>
		<view class="list-cell">
			<text class="cell-tit">检查更新</text>
			<text class="cell-tip">当前版本 1.0.1</text>
			<text class="cell-more iconfont icon-youjiantou"></text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from "vuex"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['logout']),
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			switchChange(){
				
			},
			toLogout(){
				uni.showModal({
					content:"确定要退出吗？",
					success: (e) => {
						if(e.confirm){
							this.logout();
							setTimeout(()=>{
								uni.switchTab({
									url:"/pages/mine/mine"
								})
							},500)
						}
					}
				})
			},
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #F8F8F8;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20rpx 30rpx;
		line-height:60rpx;
		position:relative;
		background: #fff;
		justify-content: center;
		border-bottom: 1rpx solid #eaeaea;
		&.log-out-btn{
			margin-top: 40rpx;
			.cell-tit{
				color: #e42208;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30rpx;
		}
		&.m-t{
			margin-top: 16rpx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:32rpx;
			color:#909399;
			margin-left:10rpx;
		}
		.cell-tit{
			flex: 1;
			font-size: 30rpx;
			color: #303133;
			margin-right:10rpx;
		}
		.cell-tip{
			font-size: 28rpx;
			color: #909399;
		}
		switch{
			transform: translateX(16rpx) scale(.84);
		}
	}
</style>
