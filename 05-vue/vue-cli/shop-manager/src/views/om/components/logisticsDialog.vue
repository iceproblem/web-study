<template>
    <el-dialog
        title="订单跟踪"
        :visible="visible"
        :before-close="handleClose"
        width="30%"
    >
        <el-steps
            direction="vertical"
            finish-status="success"
            space="60px"
            :active="8"
        >
            <el-step
                    v-for="(item,index) in logisticsList"
                    :key="index"
                    :title="item.name"
                    :description="item.time"
            >
            </el-step>
        </el-steps>
    </el-dialog>
</template>

<script>
    let defaultLogisticsList = [
        {
            name:"订单已提交，等等付款",
            time:"2020-12-10 09:00:00"
        },
        {
            name:"订单付款成功",
            time:"2020-12-10 09:02:00"
        },
        {
            name:"扫描出库",
            time:"2020-12-10 09:02:00"
        },
        {
            name:"快递拦收",
            time:"2020-12-10 09:02:00"
        },
        {
            name:"北京xxx地，扫描装车",
            time:"2020-12-10 09:02:00"
        },
        {
            name:"准备发往xxx地",
            time:"2020-12-10 09:02:00"
        },
        {
            name:"到达xxx网点，很快进行派送",
            time:"2020-12-10 09:02:00"
        },
        {
            name:"订单已签收，期待再次为你服务",
            time:"2020-12-10 09:02:00"
        }
    ]
    export default {
        name: "logisticsDialog",
        props:{
            value:Boolean
        },
        data(){
            return{
                logisticsList:Object.assign({},defaultLogisticsList)
            }
        },
        computed:{
            visible:{
                get(){
                    return this.value
                },
                set(visible){
                    this.value = visible;
                }
            }
        },
        methods:{
            handleClose(){
                this.$emit("input",false)
            }
        }
    }
</script>

<style scoped>

</style>
