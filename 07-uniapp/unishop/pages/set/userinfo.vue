<template>
	<view class="content">
		<view class="row">
			<text class="tit">用户昵称：</text>
			<input class="input" type="text" v-model="editUserInfo.nick_name" placeholder="请输入昵称" placeholder-class="placeholder">
		</view>
		<view class="row row-avatar">
			<text class="tit">用户头像：</text>
			<image class="avatar" :src="editUserInfo.icon ? SERVER_URL + editUserInfo.icon : '../../static/mine/normal_face.png'"
			 @click="changeAvatar"></image>
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	
	import {
		SERVER_URL,
		editUserMsg
	} from "@/api/index.js"
	
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				editUserInfo: {},
				SERVER_URL:SERVER_URL
			}
		},
		onLoad() {
			this.editUserInfo = Object.assign({}, this.userInfo)
		},
		methods: {
			
			...mapMutations(["login"]),
			
			// 更新用户头像
			changeAvatar() {
				uni.showActionSheet({
					itemList: ['查看头像', '从相册中选择头像'],
					success: res => {
						console.log(res);
						let index = res.tapIndex;
						if (index === 0) {
							// 查看头像
							let iconUrl = this.editUserInfo.icon ? SERVER_URL + this.editUserInfo.icon :
								'../../static/mine/normal_face.png'
							let arr = [];
							arr.push(iconUrl)
							uni.previewImage({
								urls: arr,
								longPressActions: {
									itemList: ['发送给朋友', '保存图片', '收藏'],
									success: function(data) {
										console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
									},
									fail: function(err) {
										console.log(err.errMsg);
									}
								}
							})
						} else if (index === 1) {
							// 从相册中选择头像
							uni.chooseImage({
							    count: 1, //默认9
							    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							    sourceType: ['album'], //从相册选择
							    success:  res=>{
									let tempFilePaths = res.tempFilePaths
									// editUserMsg
									uni.uploadFile({
										url: SERVER_URL+'/app/upload_icon', //仅为示例，非真实的接口地址
										filePath: tempFilePaths[0],
										name: 'icon',
										success:uploadRes=>{
											// console.log(uploadRes);
											let iconObj = JSON.parse(uploadRes.data);
											if(iconObj.status === 1){
												this.editUserInfo.icon = iconObj.data.name
											}
										}
									})
							    }
							});
						}
					}
				})
			},
			
			// 提交
			async confirm(){
				let { token,nick_name,icon }  = this.editUserInfo;
				// console.log(token,nick_name,icon);
				let result = await editUserMsg(token,nick_name,icon)
				// console.log(result);
				if(result.status === 1){
					this.$msg("更新用户信息成功~");
					this.login(result.data); // 更新vuex中的数据，在vuex中也更新本地的数据
					setTimeout(()=>{
						uni.switchTab({
							url:"/pages/mime/mime"
						})
					},2000)
				}else{
					this.$msg(result.msg,1000);
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f8f8f8;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;
		border-bottom: 1rpx solid #E8E8E8;

		.tit {
			flex-shrink: 0;
			width: 200upx;
			font-size: 30upx;
			color: #303133;
			margin-right: 10rpx;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: #303133;
		}

		.icon-dingwei {
			font-size: 50upx;
			color: #909399;
		}
	}

	.row-avatar {
		height: 220rpx;

		.avatar {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
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

	.del-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 0 auto;
		font-size: 32upx;
		color: #fff;
		background-color: #E9232C;
		border-radius: 10upx;
		box-shadow: 0 0 5px #E9232C;
	}
</style>
