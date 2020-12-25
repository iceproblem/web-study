<template>
	<view class="number-box">
		<!-- 左边 -->
		<view class="number-box-left" :class="minDisabled ? 'nocheck' : ''" @click="calcValue('sub')">
			-
		</view>
		<!-- 中边 -->
		<input type="nubmer" :disabled="true" class="number-box-center" :value="inputValue">
		<!-- 右边 -->
		<view class="number-box-right" :class="maxDisabled ? 'nocheck' : ''" @click="calcValue('add')">
			+
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			min:{
				type:Number,
				default:-Infinity
			},
			max:{
				type:Number,
				default:Infinity
			},
			value:{
				type:Number,
				default:0
			},
			isMin:{
				type:Boolean,
				default:false
			},
			isMax:{
				type:Boolean,
				default:false
			},
			step:{
				type:Number,
				default:1
			},
			index:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				inputValue:this.value,
				minDisabled:false,
				maxDisabled:false
			};
		},
		created(){
			this.minDisabled = this.isMin;
			this.maxDisabled = this.isMax
		},
		watch:{
			inputValue(number){
				let data = {
					number,
					index:this.index
				}
				this.$emit("@eventChange",data)
			}
		},
		methods:{
			calcValue(type){
				let step = this.step;
				let value = this.inputValue
				let newValue = 0;
				if(type === 'sub'){
					newValue = value - step;
					if(newValue <= this.min){
						this.minDisabled = true;
					}
					if(newValue < this.min){
						newValue = this.min
					}
					if(newValue < this.max && this.maxDisabled === true){
						this.maxDisabled = false;
					}
					
				}else if(type === 'add'){
					newValue = value + step;
					if(newValue >= this.max){
						this.maxDisabled = true;
					}
					if(newValue > this.max){
						newValue = this.max
					}
					if(newValue > this.min && this.minDisabled === true){
						this.minDisabled = false;
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.number-box{
		width: 230rpx;
		height: 70rpx;
		background-color: #ECECEC;
		border-radius: 6rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.number-box-left,
		.number-box-right{
			width: 70rpx;
			height: 70rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 36rpx;
		}
		.number-box-center{
			flex: 1;
			text-align: center;
		} 
	}
	
	.nocheck{
		color: #999999 !important;
	}
</style>
