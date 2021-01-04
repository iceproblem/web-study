<template>
	<view class="content">
		<view class="list" v-for="(item,index) in addressList" :key='index' @click="checkAddress(item)">
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
	import { getAddressList } from "@/api/index.js"
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				addressList:[],
				source: 1
			}
		},
		onLoad(option) {
			if(!this.hasLogin){
				uni.navigateTo({
					url:"/pages/login/login"
				})
				return;
			}
			this.source = option.source;
			
			// 获取地址列表
			this.getAddress();
		},
		onShow(option) {
			if(!this.hasLogin){
				uni.navigateTo({
					url:"/pages/login/login"
				})
				return;
			}
			// 获取地址列表
			this.getAddress();
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		methods: {
			// ajax获取地址列表
			async getAddress(){
				let result = await getAddressList(this.userInfo.token);
				console.log(result);
				if(result.status === 1){
					this.addressList = result.data
				}else{
					this.$msg("获取地址列表失败")
				}
			},
			// 	处理新增地址和编辑地址
			dealAddress(type,item){
				uni.navigateTo({
					url:`/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			checkAddress(item){
				if(Number(this.source) == 1){
					let pages = getCurrentPages();
					let prePage = pages[pages.length - 2];
					prePage.addressData = item;
					uni.navigateBack();
				}
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
