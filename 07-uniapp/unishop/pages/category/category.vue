<template>
	<view class="container">
		<!-- 左侧 -->
		<scroll-view scroll-y="true" class="left-aside">
			<view 
				v-for="(litem,index) in left_list" 
				:key="litem.id" 
				class="left-item" 
				:class="{active: litem.id === currentId}"
				:scroll-into-view="leftinto"
				@click="tapTap(litem)"
			>
				{{litem.name}}
			</view>
		</scroll-view>
		<!-- 右侧 -->
		<scroll-view 
			scroll-y="true" 
			class="right-aside" 
			:scroll-into-view="rightinto"
			@scroll="leftAc"
		>
			<view 
				v-for="(ritem,index) in right_list"
				:key="ritem.id"
				:id="'V' + ritem.id"
				class="right-aside"
			>
				<text class="right-list-title">{{ritem.name}}</text>
				<view class="right-list-content">
					<view class="t-item" v-for="(product,index) in ritem.products" :key="product.id">
						<image :src="product.small_image"></image>
						<text>{{product.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import left from "../../pages/category/left.json"
	import right from "../../pages/category/right.json"
	export default {
		data() {
			return {
				left_list:left.data.cate,
				right_list:right.data.cate,
				currentId: "recommend",
				rightinto:"",
				leftinto:""
			}
		},
		methods: {
			tapTap(item) {
				this.currentId = item.id,
				this.rightinto = 'V'+ item.id
			},
			leftAc(){
				
			},
		},
		computed:{
		},
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		height: 1145rpx;
		background-color: #F8F8F8;
		display: flex;
		overflow: hidden;
	
		.left-aside {
			background-color: #fff;
			width: 200rpx;
			height: 100%;
			
			.left-item {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #666666;
				width: 100%;
				height: 100rpx;
				position: relative;
				box-sizing: border-box;
	
				&.active {
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
	
		.right-aside {
			flex: 1;
			overflow: hidden;
			padding-left: 20rpx;
	
			.right-list-title {
				color: #e42208;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				height: 80rpx;
			}
	
			.right-list-content {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				padding-top: 12rpx;
				background-color: #fff;
	
				.t-item {
					box-sizing: border-box;
					width: 170rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding-bottom: 20rpx;
					background-color: #fff;
					color: #666;
	
					image {
						width: 140rpx;
						height: 140rpx;
					}
	
					text {
						font-size: 28rpx;
						text-align: center;
						
						width: 150rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
