<template>
	<view class="content">
		<view class="list" v-for="(item,index) in addressList" :key='index'>
			<view class="warpper">
				<view class="address-box">
					<text class="tag" v-if="item.default">默认</text>
					<text>{{item.address}}{{item.addressDetail}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.name}}</text>
					<text class="mobile">{{item.mobile}}</text>
				</view>
			</view>
			<text class="iconfont icon-23" @click="dealAddress('edit',item)"></text>
		</view>
		<button class="add-btn" @click="dealAddress('add')">新增地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList:[
					{
						name:"张天",
						mobile:"15687298763",
						address:"北京市昌平区",
						addressDetail:"沙河镇北京科技经营管理学院",
						default:true
					},
					{
						name:"李工",
						mobile:"18376490827",
						address:"郑州市中原区",
						addressDetail:"国家广告产业园3号楼404",
						default:false
					},
					{
						name:"王可",
						mobile:"15654298762",
						address:"北京市朝阳区",
						addressDetail:"中国传媒大学001号楼",
						default:false
					},
				]
			}
		},
		methods: {
			// 	处理新增地址和编辑地址
			dealAddress(type,item){
				uni.navigateTo({
					url:`/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40upx 30upx;
		background: #FFFFFF;
		position: absolut;
		border-bottom: 1px solid #eaeaea;
	}
	.waepper{
		display: flex;
		flex-direction: column;
		flex:1;
	}
	.address-box{
		display: flex;
		justify-content: center;
		align-items: center;
		.tag{
			color: #e42208;
			font-size: 14upx;
			border: 1upx solid #e42208;
			border-radius: 6upx;
			padding: 4upx 4upx;
			text-align: center;
			line-height: 35upx;
			background-color: #FFFFFF;
			width: 60upx;
			height: 35upx;
			margin-right: 20upx;
		}
		.address{
			font-size: 30upx;
			color: #303111;
		}
	}
	.u-box{
		font-size: 28upx;
		color: #909399;
		.name{
			margin-right: 20upx;
		}
	}
	.icon-23{
		font-size: 50upx;
		color:#e42208 ;
	}
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 60rpx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: #e42208;
		border-radius: 10upx;
		box-shadow: 0 0 6rpx #e42208;
	}
</style>
