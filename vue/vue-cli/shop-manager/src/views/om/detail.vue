<template>
    <div class="detail-container">
        <el-steps :space="200" :active="handleStepStatus(order.status)" finish-status="success">
            <el-step title="提交订单" :description="order.orderTime"></el-step>
            <el-step title="支付订单" :description="order.paymentTime"></el-step>
            <el-step title="平台发货" :description="order.deliveryTime"></el-step>
            <el-step title="确认发货" :description="order.receiveTime"></el-step>
            <el-step title="订单完成" :description="order.commentTime"></el-step>
        </el-steps>
        <el-card shadow="never" style="margin-top: 25px;">
            <div class="operate-container">
                <i class="el-icon-warning" style="margin-left: 20px; color: red;"></i>
                <span style="color: red; margin-left: 5px;">当前订单的状态: {{order.status | formatStatusType}}</span>
            </div>
            <div style="margin-top: 20px">
                <span>基本信息</span>
            </div>
            <div class="table-layout">
                <el-row>
                    <el-col class="table-cell-title"  :span="4">订单编号</el-col>
                    <el-col class="table-cell-title"  :span="5">用户账号</el-col>
                    <el-col class="table-cell-title"  :span="5">支付方式</el-col>
                    <el-col class="table-cell-title"  :span="5">订单来源</el-col>
                    <el-col class="table-cell-title"  :span="5">订单类型</el-col>
                </el-row>
                <el-row>
                    <el-col class="table-cell"  :span="4">{{order.orderSn}}</el-col>
                    <el-col class="table-cell"  :span="5">{{order.memberUsername}}</el-col>
                    <el-col class="table-cell"  :span="5">{{order.payType | formatPayType}}</el-col>
                    <el-col class="table-cell"  :span="5">{{order.sourceType | formatSourceType}}</el-col>
                    <el-col class="table-cell"  :span="5">{{order.orderType}}</el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {getOrderDetail} from "../../api/orderApi";
    export default {
        name: "detail",
        data(){
            return {
                id: null,
                order: {}
            }
        },
        created() {
            this.id = this.$route.query.id;
            getOrderDetail({id: this.id}).then((response)=>{
                if(response.status === 1){
                    this.order = response.data;
                    // console.log(this.order);
                }
            });
        },
        methods:{
            handleStepStatus(value){
                if(value === 1){
                    // 待发货
                    return 2
                }else if(value === 2){
                    // 已发货
                    return 3
                }else if(value === 3){
                    // 已完成
                    return 4
                }else { // 待付款, 已关闭, 无效订单
                    return 1
                }
            }
        },
        filters: {
            formatStatusType(value){
                if(value === 0){
                    return '待付款';
                }else if(value === 1){
                    return '待发货';
                }else if(value === 2){
                    return '已发货';
                }else if(value === 3){
                    return '已完成';
                }else if(value === 4){
                    return '已关闭';
                }else if(value === 5){
                    return '无效订单';
                }
            },
            formatPayType(value){
                if(value === 1){
                    return '支付宝';
                }else if(value === 2){
                    return '微信';
                } else {
                    return '未支付';
                }
            },
            formatSourceType(value){
                if(value === 0){
                    return 'PC订单';
                }else if(value === 1){
                    return 'APP订单';
                } else {
                    return '其它订单';
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .detail-container{
        width: 80%;
        margin: 20px auto;
        padding: 20px;
    }

    .operate-container{
        background-color: rgba(0, 255, 0, .1);
        height: 80px;
        margin: -20px -20px 0;
        line-height: 80px;
    }

    .table-layout{
        margin-top: 20px;
        border-left: 1px solid #e6e6e6;
        border-top: 1px solid #e6e6e6;
    }

    .table-cell-title{
        border-right: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        padding: 10px;
        background-color: rgba(0, 255, 0, .1);
        text-align: center;
        font-size: 14px;
    }

    .table-cell{
        border-right: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        line-height: 40px;
        padding: 10px;
        text-align: center;
        font-size: 14px;
        overflow: hidden;
    }
</style>
