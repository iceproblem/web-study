<template>
	<view>
		<u-tabs :list="list" :is-scroll="true" :current="current" @change="change"></u-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '全部'
					}, {
						name: '待付款'
					}, {
						name: '待发货',
					}, {
						name: '待收货',
					}],
					current: 0
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style>

</style>
