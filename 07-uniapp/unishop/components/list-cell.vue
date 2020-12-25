<template>
	<view 
	  class="content"
	  @click="eventClick" 
	>
		<view class="list-cell" :hover-class="hoverClass" :hover-stay-time="50">
			<text v-if="icon" class="cell-icon iconfont" :class="icon" :style="[{color: iconColor}]"></text>
			<text class="cell-title">{{title}}</text>
			<text v-if="tips" class="cell-tip">{{tips}}</text>
			<text class="cell-more iconfont icon-youjiantou"></text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		props: {
			icon: {type: String, default: ''},
			title: {type: String, default: '标题'},
			tips: {type: String, default: ''},
			hoverClass:{type: String, default: 'cell-hover'},
			iconColor:{type: String, default: '#333'},
		},
		methods:{
			eventClick(){
				this.$emit('eventClick');
			}
		}
	}
</script>

<style lang="scss">
	.list-cell{
		width: 100%;
		height: 80rpx;
		background-color: #fff;
		line-height: 80rpx;
		border-bottom: 1rpx solid #E6E6E6;
		display: flex;
		align-items: center;
	    box-sizing: border-box;
		padding: 0 10rpx; 
		&.cell-hover{
			background-color: #F8F8F8;
		}
		.cell-icon{
			width: 60rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 46rpx;
		}
		.cell-title{
			flex: 1;
			font-size: 30rpx;
			color: #333;
			line-height: 72rpx;
			height: 80rpx;
		}
		.cell-tip{
			font-size: 26rpx;
			color: #999;
			line-height: 72rpx;
			height: 80rpx;
		}
		.cell-more{
			font-size: 50rpx;
			width: 60rpx;
			height: 80rpx;
			color: #999;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
