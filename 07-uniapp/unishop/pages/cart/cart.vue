<template>
	<view class="container">
		<!-- 空白页面 -->
		<view class="empty"  v-if="!hasLogin || empty===true">
			 <image src="../../static/cart/emptyCart.png" mode="aspectFit"></image>
			 <view v-if="hasLogin" class="empty-tips">
				 购物车空空如也
				 <navigator
				  class="navigator"
				  url="../index/index"
				  open-type="switchTab"
				  >
				   随便逛逛>
				  </navigator>
			 </view>
			 <view v-else  class="empty-tips">
				 购物车空空如也
				 <view class="navigator" @click="navToLogin">去登录></view>
			 </view>
		</view>
		<!-- 列表页面 -->
		<view v-else class="no-empty">
			<block v-for="(item, index) in cartList" :key="item.goods_id">
				<view class="cart-item">
					<!-- 左侧 -->
					<view class="image-wrapper">
						<image
						 :src="item.small_image" 
						 mode="aspectFill"
						 lazy-load
						 @error="onImageError(index)"
						 >
						 </image>
						 <view
						   class="iconfont icon-xuanzhong checkbox"
						   :class="{checked: item.checked}"
						   @click="check('item', index)"
						 ></view>
					</view>
					<!-- 右侧 -->
					<view class="item-right">
						 <text class="title">{{item.goods_name}}</text>
						 <text class="attr"></text>
						 <text class="price">¥{{item.goods_price}}</text>
						 <number-box
						    :min="1"
							:max="item.buy_limit===0?Infinity:item.buy_limit"
							:value="item.num > (item.buy_limit===0?Infinity:item.buy_limit) ? (item.buy_limit===0?Infinity:item.buy_limit) : item.num"
							:isMax="item.num >= (item.buy_limit===0?Infinity:item.buy_limit) ? true : false"
							:isMin="item.num <= 1"
							:index="index"
							@eventChange="numberChange"
						 ></number-box>
					</view>
					<!-- 删除 -->
					<view class="del-btn" @click="deleteCartItem(index)">x</view>
				</view>
			</block>
		</view>
	    <!-- 底部菜单栏 -->
		<view class="bottom-section" v-show="hasLogin">
			<!-- 左侧 -->
			<view class="checkbox">
				<image 
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
				<button class="confirm-btn" type="primary" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState} from 'vuex'
	import {getCartList, changeCarNum, deleteCartOne, deleteCartAll} from '@/api/index.js'
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
				total: 0
			}
		},
		components:{
			 numberBox
		},
		computed: {
			...mapState(["hasLogin", "userInfo"])
		},
		onLoad() {
			if(this.hasLogin){
				this.loadData()
			}
		},
		onShow() {
			if(this.hasLogin){
				this.loadData()
			}
		},
		methods:{
			async loadData(){
				this.empty = false;
				// 从接口获取购物车数据
				let result = await getCartList(this.userInfo.token);
				if(result.status === 1){
					this.cartList = result.data;
					if(this.cartList.length === 0){
						this.empty = true;
					}
				}else{
					this.$api.msg('获取购物车数据失败!');
				}
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
				    if(this.cartList.length === 0){
						this.$api.msg('当前购物车中没有商品!');
						return;
					} 
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
			async numberChange(data){
				// 根据点击的索引获取商品
				const goods_id = this.cartList[data.index].goods_id;
				if(goods_id){
					let result = await changeCarNum(this.userInfo.token, goods_id, data.number);
					// console.log(result);
					if(result.status === 1){
						this.cartList[data.index].num = data.number;
						// 计算总价
						this.calcTotal();
					}else{
						this.$api.msg(result.msg, 500);
					}
				}else{
					this.$api.msg('操作商品的id不存在', 500);
				}
			},
			// 删除一个商品
			async deleteCartItem(index){
				const goods_id = this.cartList[index].goods_id;
				if(goods_id){
					let result = await deleteCartOne(this.userInfo.token, goods_id);
					if(result.status === 1){
						this.cartList.splice(index, 1);
						// 计算总价
						this.calcTotal();
					}else{
						this.$api.msg(result.msg, 500);
					}
				}else{
					this.$api.msg('操作商品的id不存在', 500);
				}
			},
			// 清空购物车
			clearCart(){
				uni.showModal({
					content: '确定清空购物车吗?',
					success: async (e) => {
						// console.log(e);
						if(e.confirm){
							uni.showLoading({
								title: '正在操作...'
							})
							let result = await deleteCartAll(this.userInfo.token);
							if(result.status === 1){
								uni.hideLoading();
								this.cartList = [];
								this.empty =  true,
								// 全选状态
								this.allChecked =  false,
								// 总价
								this.total = 0;
							}else{
								this.$api.msg(result.msg, 500);
							}
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
					/* 细节点 */
					this.allChecked = false;
					return;
				}
				
				// 计算总价
				let total = 0, checked = true;
				list.forEach(item=>{
					if(item.checked){
						total += item.goods_price * item.num; 
					}else if(item.checked === false){
						checked = false;
					}
				});
				
				// 更新
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			// 创建订单
			createOrder(){
				// 1. 获取购物车中所有已经选中的商品生成订单
				let list = this.cartList;
				let checkedList = [];
				list.forEach(item=>{
					if(item.checked){
						checkedList.push(item);
					}
				});
				
				// 2. 过滤
				if(checkedList.length === 0){
					this.$msg('没有生成订单的商品', 1000);
					return;
				}
				
				//3. 处理数据
				let orderObj = {
					orderList: checkedList,
					orderTotal: this.total 
				}; 
				
				uni.navigateTo({
					url: '/pages/order/createOrder?order=' + encodeURIComponent(JSON.stringify(orderObj))
				})
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
				width: 200rpx;
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
