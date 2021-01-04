<template>
	<view>
		<!-- 当设置tab-width,指定每个tab宽度时,则不使用flex布局,改用水平滑动 -->
		<me-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :tab-width="150"></me-tabs>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab,i) in tabs" :key="i">
				<mescroll-item :i="i" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MescrollItem from "./mescroll-swiper-item.vue";
	import MeTabs from "@/components/me-tabs/me-tabs.vue";
	
	export default {
		components: {
			MescrollItem,
			MeTabs
		},
		data() {
			return {
				height: "400px", // 需要固定swiper的高度
				tabs: [{name:'全部', status: 0}, {name:'待付款', status: 1}, {name:'待收货', status: 2}, {name:'待评价', status: 3}, {name:'售后', status: 4}],
				tabIndex: 0 // 当前tab的下标
			}
		},
		methods: {
			// 轮播菜单
			swiperChange(e){
				this.tabIndex = e.detail.current
			}
		},
		onLoad() {
			// 需要固定swiper的高度
			this.height = uni.getSystemInfoSync().windowHeight + 'px'
		}
	}
</script>

<style>
</style>
