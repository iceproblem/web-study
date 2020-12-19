<template>
    <div>
        <!--头部区域-->
        <el-card class="operate-top-card" shadow="never">
            <i class="el-icon-s-order" style="font-size: 18px; margin-right: 3px;"></i>
            <span>发货列表</span>
        </el-card>
        <!--内容区域-->
        <div class="table-container">
            <el-table
                    :data="listData"
                    border
                    style="width: 100%"
            >
                <el-table-column label="订单编号" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.orderSn}}</template>
                </el-table-column>
                <el-table-column label="收货人"  width="90" align="center">
                    <template slot-scope="scope">{{scope.row.receiverName}}</template>
                </el-table-column>
                <el-table-column label="手机号码"  width="120" align="center">
                    <template slot-scope="scope">{{scope.row.receiverPhone}}</template>
                </el-table-column>
                <el-table-column label="邮政编码"  width="100" align="center">
                    <template slot-scope="scope">{{scope.row.receiverPostCode}}</template>
                </el-table-column>
                <el-table-column label="收货地址"   align="center">
                    <template slot-scope="scope">
                        {{scope.row.address}}
                    </template>
                </el-table-column>
                <el-table-column label="配送方式"  align="center">
                    <template slot-scope="scope">
                        <el-select placeholder="请选择物流公司" v-model="scope.row.deliveryCompany">
                            <el-option
                                    v-for="item in deliveryCompanyOptions"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="物流单号" align="center">
                    <template slot-scope="scope">
                        <el-input size="small" v-model="scope.row.deliverySn"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center; margin-top: 15px;">
                <el-button
                        @click="cancel"
                >取消</el-button>
                <el-button
                        type="danger"
                        @click="confirm"
                >
                    确定
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {deliveryOrder} from './../../api/orderApi'
    export default {
        name: "deliverList",
        data(){
            return {
                deliveryCompanyOptions: [
                    '顺丰快递', '申通快递', '中通快递', '韵达快递'
                ],
                listData: []
            }
        },
        created(){
            this.listData = this.$route.query.listData
        },
        methods: {
            cancel(){
                this.$router.back();
            },
            confirm(){
                this.$confirm('是否要进行发货操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(this.listData);
                    // 物流发货
                    deliveryOrder({orderList: this.listData}).then((response)=>{
                        if(response.status === 1){
                            this.$message({
                                type: 'success',
                                message: '发货成功!'
                            });
                            this.$router.back();
                        }
                    }).catch((error)=>{
                        this.$message({
                            type: 'error',
                            message: '发货失败!'
                        });
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
