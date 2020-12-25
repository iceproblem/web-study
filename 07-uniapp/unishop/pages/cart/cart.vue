<template>
	<!-- 
		1）没有登录   显示 登录后才能查看购物车
		2）登录了 
			没有买东西  购物车空空如也
			有商品加入到了购物车   商品列表页面
	 -->
	<view class="container">
		<!-- 空白页面：1）登录后才能查看购物车  2）购物车空空如也 -->
		<view class="empty" v-if="empty==true || !hasLogin">
			<image src="../../static/cart/emptyCart.png"></image>
			<view v-if="hasLogin" class="empty-tips">
				<!-- 登录 -->
				购物车空空如也
				<navigator class="navigator" url="../index/index" open-type="switchTab">随便逛逛</navigator>
			</view>
			<view v-else class="empty-tips">
				<!-- 没有登录 -->
				登录后才能查看购物车
				<view class="navigator" @click="navToLogin">去登录</view>
			</view>
		</view>
		<!-- 商品列表页面 已登录 -->
		<view v-else>
			<block v-for="(item, index) in cartList" :key="item.id">
				<view class="cart-item">
					<!-- 左侧 -->
					<view class="image-wrapper">
						<image :src="item.image" mode="aspectFill" lazy-load @error="onImageError(index)">
						</image>
						<view class="iconfont icon-xuanzhong checkbox" 
						:class="{checked: item.checked}" @click="check('item', index)"></view>
					</view>
					<!-- 右侧 -->
					<view class="item-right">
						<text class="title">{{item.title}}</text>
						<text class="attr">{{item.attr_val}}</text>
						<text class="price">¥{{item.price}}</text>
						<number-box :min="1" :max="item.stock" 
						:value="item.number > item.stock ? item.stock : item.number" 
						:isMax="item.number >= item.stock ? true : false"
						 :isMin="item.number <= 1" 
						 :index="index" @eventChange="numberChange"></number-box>
					</view>
					<!-- 删除 -->
					<view class="del-btn" @click="deleteCartItem(index)">x</view>
				</view>
			</block>
		</view>
		<!-- 底部菜单栏 -->
		<view class="bottom-section" v-show="empty !== true">
			<!-- 左侧 -->
			<view class="checkbox">
				<image 
				style="width: 40rpx;"
				:src="allChecked ? '/static/cart/selected.png' : '/static/cart/select.png'" mode="aspectFit"
				@click="check('all')"
				>
				</image>
				<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
					清空
				</view>
			</view>
			<!-- 右侧 -->
			<view class="total-box">
				<text class="total">总计: </text>
				<text class="price">¥{{total}}</text>
				<button class="confirm-btn" type="primary">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import numberBox from '../../components/number-box.vue'
	export default {
		data(){
			return {
				// 购物车列表
				cartList: [],
				// 已经登录, 列表数据为空  false / ture
				empty: false,
				// 全选状态
				allChecked: false,
				// 总价
				total: 0,
				hasLogin:true,
			}
		},
		components:{
			 numberBox
		},
		computed: {
		},
		onLoad() {
			this.loadData()
		},
		methods:{
			loadData(){
				this.cartList = [
					{
						id: 1,
						image: "http://img10.360buyimg.com/n2/s240x240_jfs/t1/148237/6/13541/260321/5fa6157aEb8b902f0/72ac8895bf838553.jpg!q70.jpg",
						title: "百草味礼盒巨型零食大礼包",
						attr_val: "味道好极了，好想吃呀",
						price: 9.99,
						number: 1,
						stock: 10,
						checked: true
					},
					{
						id: 2,
						image: "http://img10.360buyimg.com/n2/s240x240_jfs/t1/153784/37/10785/182271/5fe0556aEb0ceb6df/94e3c0c5ad81a4b3.jpg!q70.jpg",
						title: "良品铺子纯肉零食大礼包",
						attr_val: "味道好极了，好想吃呀",
						price: 9.99,
						number: 1,
						stock: 10,
						checked: true
					},
				];
				// 计算总价
				this.calcTotal();
			},
			navToLogin(){
				// console.log('去登陆');
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			// 监听图片加载失败
			onImageError(index){
				this.cartList[index].image = "/static/cart/errorImage.jpg"
			},
			// 选中和取消选中
			check(type, index){
				if(type === 'item'){ // 单个商品选中和取消选中
					this.cartList[index].checked = !this.cartList[index].checked;
				}else{ // 全部商品
				    const checked = !this.allChecked;
					// 遍历
					this.cartList.forEach(item=>{
						 item.checked = checked;
					});
					// 记录最终是否全选
					this.allChecked = checked;
				}
				
				// 计算总价
				this.calcTotal();
			},
			// 购物车商品数量发生改变
			numberChange(data){
				this.cartList[data.index].number = data.number;
				// 计算总价
				this.calcTotal();
			},
			// 删除一个商品
			deleteCartItem(index){
				this.cartList.splice(index, 1);
			    // 计算总价
			    this.calcTotal();
			},
			// 清空购物车
			clearCart(){
				uni.showModal({
					content: '确定清空购物车吗?',
					success: (e) => {
						// console.log(e);
						if(e.confirm){
							this.cartList = [];
							this.empty =  true,
							// 全选状态
							this.allChecked =  false,
							// 总价
							this.total = 0;
						}
					}
				})
			},
			// 计算总价
			calcTotal(){
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					this.total = 0;
					return;
				}
				
				// 计算总价
				let total = 0, checked = true;
				list.forEach(item=>{
					if(item.checked){
						total += item.price * item.number; 
					}else if(item.checked === false){
						checked = false;
					}
				});
				
				// 更新
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		height: 100%;

		.empty {
			box-sizing: border-box;
			background-color: #FFFFFF;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding-bottom: 200rpx;

			image {
				width: 240rpx;
				height: 240rpx;
			}

			.empty-tips {
				margin-top: 20rpx;
				display: flex;
				font-size: 30rpx;
				color: red;

				.navigator {
					color: #E9232C;
					margin-left: 16rpx;
				}
			}
		}
	}

	.cart-item {
		display: flex;
		align-items: center;
		padding: 30rpx 40rpx;
		border-bottom: 1rpx solid #E8E8E8;
		position: relative;

		.image-wrapper {
			width: 200rpx;
			height: 200rpx;
			position: relative;

			image {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}

			.checkbox {
				color: #999;
				font-size: 34rpx;
				position: absolute;
				top: 88rpx;
				left: -40rpx;
				z-index: 10;
			}
		}

		.item-right {
			flex: 1;
			box-sizing: border-box;
			padding: 20rpx;
			display: flex;
			flex-direction: column;

			.title,
			.price {
				font-size: 34rpx;
				color: #000000;
			}

			.attr {
				font-size: 26rpx;
				padding: 10rpx 0;
				color: #666666;
			}

			.price {
				color: #E9232C;
				margin-bottom: 6rpx;
			}
		}

		.del-btn {
			position: absolute;
			right: 20rpx;
			top: 10rpx;
		}
	}

	.bottom-section {
		/* #ifdef H5 */
		margin-bottom: 100rpx;
		/* #endif */
		position: fixed;
		left: 50rpx;
		bottom: 50rpx;
		width: 650rpx;
		height: 100rpx;
		background-color: rgba($color: #ffffff, $alpha: 1.0);
		box-shadow: 0 0 20rpx 0 rgba($color: #000000, $alpha: .4);
		border-radius: 50rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;

		.checkbox {
			width: 200rpx;
			height: 100rpx;
			position: relative;

			// background-color: red;
			image {
				width: 54rpx;
				height: 100%;
				z-index: 100;
			}

			.clear-btn {
				background-color: red;
				position: absolute;
				left: 50rpx;
				top: 28rpx;
				height: 44rpx;
				padding: 0 40rpx;
				border-radius: 50rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				// 隐藏
				// visibility: hidden;
				opacity: 0;
				transition: .2s;

				&.show {
					opacity: 1;
					// visibility: visible;
				}
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;

			.total {
				color: #808080;
				font-size: 28rpx;
			}

			.price {
				color: red;
				font-size: 34rpx;
				margin-left: 10rpx;
			}

			.confirm-btn {
				width: 180rpx;
				height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 40rpx;
				background-color: red;
				margin: 0;
				margin-left: 20rpx;
			}
		}
	}

	.checked {
		color: #e42208 !important;
	}
</style>
