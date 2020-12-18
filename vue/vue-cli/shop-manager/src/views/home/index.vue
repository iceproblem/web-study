<template>
    <div class="app-container">
        <div class="total-layout">
            <el-row :gutter="24">
                <el-col :span="8">
                    <div class="total-frame">
                        <div class="total-icon">
                            <i class="icon iconfont icon-ic_opt_feature" style="font-size: 80px;"></i>
                        </div>
                        <div class="total-content">
                            <div class="total-title">商城客户端</div>
                            <div class="total-value">微商城</div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="total-frame">
                        <div class="total-icon">
                            <i class="icon iconfont icon-yonghuliebiao" style="font-size: 80px;"></i>
                        </div>
                        <div class="total-content">
                            <div class="total-title">CRM订单中心</div>
                            <div class="total-value">业务自动化处理</div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="total-frame">
                        <div class="total-icon">
                            <i class="icon iconfont icon-shangpin" style="font-size: 80px;"></i>
                        </div>
                        <div class="total-content">
                            <div class="total-title">物流发货</div>
                            <div class="total-value">对接物流系统</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="overview-layout">
            <el-row :gutter="24">
                <el-col :span="12">
                    <div class="out-border">
                        <div class="layout-title">商品总数据</div>
                        <div style="padding: 40px">
                            <el-row>
                                <el-col :span="6" class="color-danger overview-item-value">{{productData.allProduct}}</el-col>
                                <el-col :span="6" class="color-danger overview-item-value">{{productData.newProduct}}</el-col>
                                <el-col :span="6" class="color-danger overview-item-value">{{productData.publishProduct}}</el-col>
                                <el-col :span="6" class="color-danger overview-item-value">{{productData.unPublishProduct}}</el-col>
                            </el-row>
                            <el-row class="font-medium">
                                <el-col :span="6" class="overview-item-title">全部商品</el-col>
                                <el-col :span="6" class="overview-item-title">新品推荐</el-col>
                                <el-col :span="6" class="overview-item-title">已上架</el-col>
                                <el-col :span="6" class="overview-item-title">已下架</el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="out-border">
                        <div class="layout-title">其它数据统计</div>
                        <div style="padding: 40px">
                            <el-row>
                                <el-col :span="6" class="color-danger overview-item-value">{{otherData.adminCount}}</el-col>
                            </el-row>
                            <el-row class="font-medium">
                                <el-col :span="6" class="overview-item-title">管理员总数量</el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="un-handle-layout">
            <div class="layout-title">待处理事务</div>
            <div class="un-handle-content">
                <el-row :gutter="24">
                    <el-col :span="8">
                        <div class="un-handle-item">
                            <span class="font-medium">待付款订单</span>
                            <span style="float: right" class="color-danger">({{orderData.willPayCount}})</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="un-handle-item">
                            <span class="font-medium">待发货订单</span>
                            <span style="float: right" class="color-danger">({{orderData.willTranCount}})</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="un-handle-item">
                            <span class="font-medium">已发货订单</span>
                            <span style="float: right" class="color-danger">({{orderData.onTranCount}})</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="un-handle-item">
                            <span class="font-medium">已完成订单</span>
                            <span style="float: right" class="color-danger">({{orderData.successOrderCount}})</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="un-handle-item">
                            <span class="font-medium">已关闭订单</span>
                            <span style="float: right" class="color-danger">({{orderData.closeOrderCount}})</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="un-handle-item">
                            <span class="font-medium">无效订单</span>
                            <span style="float: right" class="color-danger">({{orderData.failOrderCount}})</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getProductCount,
        getOrderCount,
        getAdminCount
    } from '../../api/adminApi'

    export default {
        name: 'index',
        data () {
            return {
                productData: {
                    allProduct: null,
                    newProduct: null,
                    publishProduct: null,
                    unPublishProduct: null
                },
                otherData: {
                    adminCount: null
                },
                orderData: {
                    willPayCount: null, // 待付款订单
                    willTranCount: null, // 待发货订单
                    onTranCount: null, // 已发货订单
                    successOrderCount: null, // 已完成订单
                    closeOrderCount: null, // 待确认收货订单
                    failOrderCount: null, // 待处理退货订单
                }
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                getAdminCount().then(response => {
                    if (response.status === 1) {
                        this.otherData = response.data;
                    }
                });
                getOrderCount().then(response => {
                    if (response.status === 1) {
                        this.orderData = response.data;
                    }
                });
                getProductCount().then(response => {
                    console.log(response);
                    if (response.status === 1) {
                        this.productData = response.data
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .total-layout {
        margin-top: 30px;
    }

    .total-frame {
        border: 1px solid #DCDFE6;
        padding: 20px;
        height: 100px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .total-icon {
        color: #409EFF;
    }

    .total-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;
        font-size: 18px;
        color: #409EFF;
    }

    .total-title {
        margin-bottom: 10px;
    }

    .total-value {
        color: #909399;
        font-size: 15px;
    }

    .un-handle-layout {
        margin-top: 30px;
        border: 1px solid #DCDFE6;
    }

    .layout-title {
        color: #606266;
        padding: 15px 20px;
        background: #F2F6FC;
        font-weight: bold;
    }

    .un-handle-content {
        padding: 20px 40px;
    }

    .un-handle-item {
        border-bottom: 1px solid #EBEEF5;
        padding: 10px;
    }

    .font-medium {
        font-size: 16px;
        color: #606266;
    }

    .color-danger {
        color: #E9232C;
    }

    .overview-layout {
        margin-top: 30px;
    }

    .overview-item-value {
        font-size: 24px;
        text-align: center;
    }

    .overview-item-title {
        margin-top: 10px;
        text-align: center;
    }

    .out-border {
        border: 1px solid #DCDFE6;
    }
</style>
