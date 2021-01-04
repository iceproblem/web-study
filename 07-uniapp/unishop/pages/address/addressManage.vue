<template>
	<view class="content">
		<view class="row">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder">
		</view>
		<view class="row">
			<text class="tit">手机号</text>
			<input class="input" type="text" v-model="addressData.phone" placeholder="收货人手机号" placeholder-class="placeholder">
		</view>
		<view class="row">
			<text class="tit">地址</text>
			<text class="input" @click="chooseLocation">{{addressData.address}}</text>
		</view>
		<view class="row">
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.address_detail" placeholder="楼号,门牌" placeholder-class="placeholder" />
		</view>
		<view class="row default-row">
			<text class="tit">设置为默认</text>
			<switch :checked="addressData.is_default" color="#e42208" @change="switchChange" ></switch>
		</view>
		<button class="add-btn" @click="confirm">提交</button>
		<button v-if="isEdit" class="del-btn" @click="confirm">删除</button>
	</view>
</template>

<script>
	import { editAddress,addAddress,deleteAddress } from "@/api/index.js"
	import { mapState } from "vuex"
	export default{
		data(){
			return{
				addressData:{
					name:"",
					phone:"",
					address:"请点击选择地图位置",
					address_detail:"",
					is_default:false
				},
				isEdit:false  // 是否处于编辑状态
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		onLoad(option){
			// 判断是否登录
			if(!this.hasLogin){
				uni.navigateTo({
					url:"/pages/login/login"
				})
				return;
			}
			
			let navTitle = "新增收货地址"
			if(option.type === 'edit'){
				navTitle = "编辑收货地址"
				console.log(option);
				// 如果处于编辑状态，获取原来地址的数据
				this.addressData = JSON.parse(option.data)
				//修改编辑状态
				this.isEdit = true;
			}
			uni.setNavigationBarTitle({
				title:navTitle
			})
		},
		methods:{
			async confirm(){
				// 添加地址
				let data = this.addressData;
				if(!data.name){
					this.$msg("请填写收货人姓名")
					return;
				}
				if(!/^[1][3|4|5|6|7|6|8|9][0-9]{9}$/.test(data.phone)){
					this.$msg("请输入正确的手机号码")
					return;
				}
				if(!data.address || data.address === '请点击选择地图位置'){
					this.$msg("请点击选择地图位置")
					return;
				}
				if(!data.address_detail){
					this.$msg("请填写详细的地址信息")
					return;
				}
				
				let { token } = this.userInfo;
				if(!this.isEdit){
					// 添加
					let result = await addAddress(token, data.name, data.phone, data.address, data.address_detail, data.is_default);
					if(result.status === 1){
						this.$msg("添加地址成功")
						setTimeout(()=>{
							uni.navigateBack();
						},1000)
					}else{
						this.$msg("添加地址失败，请检查你的网络")
					}
				}else{
					// 编辑
					let result = await editAddress(token, data.id, data.name, data.phone, data.address, data.address_detail, data.is_default)
					if(result.status === 1){
						this.$msg("修改地址成功")
						setTimeout(()=>{
							uni.navigateBack();
						},1000)
					}else{
						this.$msg("修改地址失败，请检查你的网络")
					}
				}
				
			},
			chooseLocation(){
				uni.chooseLocation({
				    success:  res=>{
				        // console.log('位置名称：' + res.name);
				        // console.log('详细地址：' + res.address);
				        // console.log('纬度：' + res.latitude);
				        // console.log('经度：' + res.longitude);
						this.addressData.address = res.name;
						this.addressData.addressDetail = res.address;
				    }
				});
			},
			switchChange(e){
				// console.log(e)
				this.addressData.is_default = e.detail.value;
			},
			// 删除地址
			async delAddress(){
				 let result = await deleteAddress(this.userInfo.token, this.addressData.id);
				 if(result.status === 1){
				 	this.$msg("删除地址成功")
				 	setTimeout(()=>{
				 		uni.navigateBack();
				 	},1000)
				 }else{
				 	this.$msg("删除地址失败，请检查你的网络")
				 }
			}
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
