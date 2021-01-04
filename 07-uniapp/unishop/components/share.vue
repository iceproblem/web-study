<template>
	<view v-if="show" class="mask" @click="toggleMask" @touchmove.stop.prevent="stopPrevent"
		:style="{backgroundColor: backgroundColor}"
	>
		<view 
			class="mask-content"
			@click.stop.prevent="stopPrevent"
			:style="[{
				height: config.height, 
				transform: transform
			}]"
		>
			<scroll-view class="view-content" scroll-y>
				<view class="share-header">
					分享到
				</view>
				<view class="share-list">
					<view 
						v-for="(item, index) in shareList" :key="index"
						class="share-item" 
						@click="shareToFriend(item.text)"
					>
						<image :src="item.icon" mode=""></image>
						<text>{{item.text}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="bottom b-t" @click="toggleMask">取消</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				backgroundColor: 'rgba(0, 0, 0, 0)',
				show: false,
				config: {},
				transform: 'translateY(50vh)'
			}
		},
		props:{
			// 1.要分享的图标
			shareList: {
				type: Array,
				default: function(){
					return [];
				}
			},
			// 2.内容盒子高度
			contentHeight: {
				type: Number,
				default: 0
			}
		},
		created() {
			this.config = {height: this.contentHeight + 'px'};
			this.backgroundColor = 'rgba(0, 0, 0, .4)';
			this.transform = `translateY(${this.contentHeight}px)`
		},
		methods:{
			// 1. 点击了主面板
			toggleMask(){
				console.log(this.show);
				// 如果处于展示状态
				if(this.show){
					this.backgroundColor = 'rgba(0, 0, 0, 0)';
					this.transform = `translateY(${this.contentHeight}px)`;
					setTimeout(()=>{
						this.show = false;
					}, 200);
					return;
				}
				
				// 如果没有展示
				this.show = true;
				setTimeout(()=>{
					this.backgroundColor = 'rgba(0, 0, 0, .4)';
					this.transform = `translateY(0)`;
				}, 10);
				
			},
			// 2. 防止冒泡和滚动穿透
			stopPrevent(){},
			// 3. 处理分享的内容
			shareToFriend(){
				
			}
		}
	}
</script>


<style lang='scss'>
	.mask{
		position:fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display:flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 998;
		transition: .3s;
		.bottom{
			position:absolute;
			left: 0;
			bottom: 0;
			display:flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 90upx;
			background: #fff;
			z-index: 9;
			font-size: 30rpx;
			color: #303133;
		}
	}
	
	.mask-content{
		width: 100%;
		height: 580upx;
		transition: .3s;
		background: #fff;
		&.has-bottom{
			padding-bottom: 90upx;
		}
		.view-content{
			height: 100%;
		}
	}
	.share-header{
		height: 110upx;
		font-size: 30rpx;
		color: #303133;
		display:flex;
		align-items:center;
		justify-content: center;
		padding-top: 10upx;
		&:before, &:after{
			content: '';
			width: 240upx;
			heighg: 0;
			border-top: 1px solid #E4E7ED;
			transform: scaleY(.5);
			margin-right: 30upx;
		}
		 &:after{
			 margin-left: 30upx;
			 margin-right: 0;
		 }
	}
	.share-list{
		display:flex;
		flex-wrap: wrap;
	}
	.share-item{
		min-width: 33.33%;
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 180upx;
		image{
			width: 80upx;
			height: 80upx;
			margin-bottom: 16upx;
		}
		text{
			font-size: 28upx;
			color: #606266;
		}
	}
</style>
