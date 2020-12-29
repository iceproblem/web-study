<template>
	<view class="content">
		<view class="row">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder">
		</view>
		<view class="row">
			<text class="tit">手机号</text>
			<input class="input" type="text" v-model="addressData.mobile" placeholder="收货人手机号" placeholder-class="placeholder">
		</view>
		<view class="row">
			<text class="tit">地址</text>
			<text class="input" @click="chooseLocation">{{addressData.address}}</text>
		</view>
		<view class="row">
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.addressDetatil" placeholder="楼号,门牌" placeholder-class="placeholder" />
		</view>
		<view class="row default-row">
			<text class="tit">设置为默认</text>
			<switch :checked="addressData.default" color="#e42208" @change="switchChange" ></switch>
		</view>
		<button class="add-btn" @click="confirm">提交</button>
		<button v-if="isEdit" class="del-btn" @click="confirm">删除</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				addressData:{
					name:"",
					mobile:"",
					address:"请点击选择地址位置",
					addressDetatil:"",
					default:false
				},
				isEdit:false // 是否处于编辑状态
			}
		},
		onLoad(option) {
			let navTitle = "新增收货地址"
			if(option.type === 'edit'){
				navTitle = "编辑收货地址"
				// 处于编辑状态，获取原来的地址数据
				this.addressData = JSON.parse(option.data);
				this.isEdit = true;
			}
			uni.setNavigationBarTitle({
				title:navTitle
			})
			
		},
		methods:{
			confirm(){
				
			},
			chooseLocation(){
				uni.chooseLocation({
					success: (res) => {
						this.addressData.address = res.name;
						this.addressData.addressDetatil = res.address;
					}
				})
			},
			switchChange(e){
				this.addressData.default = e.detail.value;
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: #f8f8f8;
		padding-top: 16upx;
	}
	
	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		border-bottom: 1rpx solid #E8E8E8;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: #303133;
			margin-right: 10rpx;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: #303133;
		}
		.icon-dingwei{
			font-size: 50upx;
			color: #909399;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto 20rpx;
		font-size: 32upx;
		color: #fff;
		background-color: #e42208;
		border-radius: 10upx;
		box-shadow: 0 0 5px #e42208;
	}
	.del-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 0 auto;
		font-size: 32upx;
		color: #fff;
		background-color: #e42208;
		border-radius: 10upx;
		box-shadow: 0 0 5px #e42208;
	}
</style>
