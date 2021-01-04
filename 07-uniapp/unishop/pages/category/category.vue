<template>
	<view class="container">
		<!-- 左边 -->
		<scroll-view 
		   scroll-y="true"
		   class="left-aside"	   
		>
			<view 
			  v-for="item in left_list"
			  :key="item.id"
			  class="left-item"
			  :class="{active: item.id === currentId}"
			  @click="tapTab(item)"
			>
				{{item.name}}
			</view>
		</scroll-view>
		<!-- 右边 -->
		<scroll-view 
		  scroll-y="true" 
		  class="right-aside"	
		>
			<view
			  v-for="ritem in right_list"
			  :key="ritem.id"
			  class="right-list"
			>
				<text class="right-list-title">{{ritem.name}}</text>
				<view class="right-list-content">
					<view
					  class="t-item"
					  v-for="product in ritem.products"
					  :key="product.id"
					>
						<image :src="product.small_image" mode=""></image>
						<view>
							<text>{{product.name}}</text>
							<text>¥{{product.price}}</text>
						</view>
					  <view  class="like-cart s-cart" @click.stop.prevent="addToCart(product)">
						  <text class="iconfont icon-gouwucheman" style="font-size: 50rpx; color: #E9232C;"></text>
					  </view> 
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { getCateLeft,getCateRight,addGoodsToCart } from "@/api/index.js"
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				left_list: [],
				right_list: [],
				currentId: "lm001"
			}
		},
		onLoad() {
			this.getLeftData();
			this.getRightData("lm001");
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		methods: {
			// 获取左侧菜单 
			async getLeftData(){
				let result = await getCateLeft();
				// console.log("left:",result);
				if(result.status === 1){
					this.left_list = result.data.cate;
				}
			},
			// 获取右侧数据 
			async getRightData(tag){
				uni.showLoading({
					title:"加载中..."
				})
				let result = await getCateRight(tag);
				// console.log("right;",result);
				if(result.status === 1){
					uni.hideLoading()
					this.right_list = result.data.cate;
				}
			},
			
			// 点击左侧
			tapTab(item) {
				this.currentId = item.id;
				this.getRightData(this.currentId)
			},
			// 添加购物车
			async addToCart(goods){
				// 判断用户是否登录
				if(!this.hasLogin){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
				// 把商品加入到购物车
				let {token} = this.userInfo;
				let result = await addGoodsToCart(token, goods.id, goods.name, goods.buy_limit, goods.price, goods.small_image);
				// console.log(result);
				if(result.status === 1){
					this.$msg("成功加入购物车")
				}else{
					this.$msg("加入购物车失败")
				}
			}
		}
	}
</script>

<style lang="scss">
	page,
	.container{
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
		display: flex;
		overflow: hidden;
		.left-aside{
			background-color: #fff;
			width: 200rpx;
			height: 100%;
			.left-item{
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #666666;
				width: 100%;
				height: 100rpx;
				position: relative;
				&.active{
					color: #e42208;
					background-color: #F8F8F8;
					&:before {
						content: '';
						position: absolute;
						width: 10rpx;
						height: 50rpx;
						background-color: #e42208;
						position: absolute;
						left: 0;
						border-radius: 0 8rpx 8rpx 0;
					}
				}
			}
		}
		.right-aside{
			flex: 1;
			overflow: hidden;
			padding-left: 20rpx;
			.right-list-title{
				color: #e42208;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				height: 80rpx;
			}
			.right-list-content{
				flex: 1;
				display: flex;
				flex-direction: column;
				width: 100%;
				padding-top: 12rpx;
				background-color: #fff;
				.t-item{
					box-sizing: border-box;
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					padding-bottom: 20rpx;
					padding-top: 20rpx;
					background-color: #fff;
					color: #666;
					border-bottom: 1rpx solid #e2e2e2;
					position: relative;
					image{
						width: 140rpx;
						height: 140rpx;
					}
					view{
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						margin-left: 15rpx;
						text{
							font-size: 28rpx;
							text-align: center;
							margin-bottom: 8rpx;
						}
					}
					
				}
			}
		}
	}
	
	.like-cart{
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
	}
	
	.s-cart{
		width: 60rpx;
		height: 60rpx;
	}
</style>
