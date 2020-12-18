<template>
    <div class="app-container">
        <!-- 筛选搜索区域 -->
        <el-card shadow="never">
            <div>
                <i class="el-icon-search" style="font-size: 18px; margin-right: 4px;"></i>
                <span>筛选搜索</span>
                <el-button class="btn-clear" size="mini" style="float: right;" @click="handleResetSearch">清空</el-button>
                <el-button class="btn-find" size="mini" type="primary" style="float: right; margin-right: 10px;" @click="handleSearchList">查询订单</el-button>
            </div>
            <div style="margin-top: 50px">
                <el-form
                        ref="productCateForm"
                        :model="listQuery"
                        label-width="150px"
                        :inline="true"
                >
                    <el-form-item label="订单编号：">
                        <el-input v-model="listQuery.orderSn" style="width: 180px;" placeholder="请输入订单编号"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态：">
                        <el-select v-model="listQuery.status" placeholder="请选择订单的状态"  style="width: 150px;">
                            <el-option
                                    v-for="item in statusOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单分类：">
                        <el-select v-model="listQuery.orderType" placeholder="请选择订单分类"  style="width: 150px;">
                            <el-option
                                    v-for="item in orderTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单来源：">
                        <el-select v-model="listQuery.sourceType" placeholder="请选择订单来源"  style="width: 150px;">
                            <el-option
                                    v-for="item in sourceTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下单时间：">
                       <el-date-picker v-model="listQuery.orderTime" type="date" placeholder="选择日期">
                       </el-date-picker>
                    </el-form-item>
                    <el-form-item label="收货人：">
                        <el-input v-model="listQuery.receiverName"  placeholder="请输入收货人姓名"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <!--列表区域-->
        <div style="margin-top: 25px">
            <!--头部区域-->
            <el-card shadow="never">
                <i class="el-icon-s-order" style="font-size: 18px; margin-right: 4px;"></i>
                <span>订单列表</span>
            </el-card>
            <!--内容区域-->
            <div class="table-container">
                <el-table
                        ref="multipleTable"
                        :data="list"
                        v-loading="listLoading"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        >
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            label="序号"
                            width="60"
                            align="center"
                    >
                        <template slot-scope="scope">{{ (scope.$idnex)+((listQuery.pageNum-1)*(listQuery.pageSize))}}</template>
                    </el-table-column>
                    <el-table-column
                            label="订单编号"
                            width="100"
                            align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.orderSn }}</template>
                    </el-table-column>
                    <el-table-column
                            label="用户账号"
                            align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.memberUsername }}</template>
                    </el-table-column>
                    <el-table-column
                        label="下单时间" 
                        align="center"
                        width="160"
                    >
                    <template slot-scope="scope">{{ scope.row.orderTime }}</template>
                    </el-table-column>
                    <el-table-column
                        label="订单金额" 
                        align="center"
                    >
                    <template slot-scope="scope">{{ scope.row.totalAmount }}</template>
                    </el-table-column>
                    <el-table-column
                        label="支付方式" 
                        align="center"
                    >
                    <template slot-scope="scope">{{ scope.row.payType }}</template>
                    </el-table-column>
                    <el-table-column
                        label="订单来源" 
                        align="center"
                    >
                    <template slot-scope="scope">{{ scope.row.sourceType }}</template>
                    </el-table-column>
                    <el-table-column
                        label="订单状态" 
                        align="center"
                    >
                    <template slot-scope="scope">{{ scope.row.status }}</template>
                    </el-table-column>
                    <el-table-column
                        label="操作" 
                        align="center"
                        width="220"
                    >
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleLookOrder(scope.$index,scope.row)">查看订单</el-button>
                        <el-button size="mini" type="danger" @click="handleCloseOrder(scope.$index,scope.row)">关闭订单</el-button>
                    </template>
                    </el-table-column>

                </el-table>
            </div>
            <!-- 批量-->
            <div class="many-operate-container">
                <el-select placeholder="批量操作列表" v-model="operatesType" size="small">
                    <el-option
                        v-for="item in operatesOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button size="mini" type="denger" style="margin-left:10px" @click="handleManyOperate">确定</el-button>
            </div>
            <!-- 分类列表的分页区域 -->
            <div class="pagination-container">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="listQuery.pageNum"
                    :page-sizes="[5, 10, 15]"
                    :page-size="listQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {getOrderList} from "../../api/orderApi"
    let defaultListQuery = {
        pageNum:1,  // 当前是第几页
        pageSize:5, // 每页5条数据
        orderSn:null, // 订单编号
        status:null, // 订单的状态
        orderType:null, // 订单的分类
        sourceType:null, // 订单的来源
        orderTime:null, // 下单时间
        receiverName:null, // 收货人
    }
    export default {
        name: "index",
        data(){
            return{
                listQuery:Object.assign({},defaultListQuery),
                statusOptions:[ // 订单状态： 0->待付款 1->待发货 2->已发货 3->已完成  4-已关闭  5-无效订单
                    {label:"待付款",value:0},
                    {label:"待发货",value:1},
                    {label:"已发货",value:2},
                    {label:"已完成",value:3},
                    {label:"已关闭",value:4},
                    {label:"无效订单",value:5},
                ],
                orderTypeOptions:[ // 订单分类  正常订单  活动订单
                    {label:"正常订单",value:0},
                    {label:"活动订单",value:1},
                ],
                sourceTypeOptions:[ // 订单来源  PC端订单   APP订单
                    {label:"PC端订单",value:0},
                    {label:"APP订单",value:1},
                ],
                // 表格中数据加载时的动画效果，false表示没有
                listLoading:false,
                list:[],  // 列表中的数据
                // 批量选择项
                operatesOptions:[
                    {label:"批量发货",value:1},
                    {label:"关闭订单",value:2},
                    {label:"删除订单",value:3},
                ],
                operatesType:"", //批量选择中的数据
                total:null, // 总记记录数
            }
        },
        created(){
            this.getList(); // 获取订单数据
        },
        methods:{
            // 改变每页的条数
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            // 切换页码
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
            },
            // 清空搜索列表
            handleResetSearch(){

            },
            // 搜索
            handleSearchList(){

            },
            // 批量选择
            handleSelectionChange(val){},
            // 查看订单
            handleLookOrder(index,row){},
            // 关闭订单
            handleCloseOrder(index,row){},
            // 批量操作按钮
            handleManyOperate(){},
            // 获取订单数据
            async getList(){
                let result = await getOrderList(this.listQuery);
            },
        }
    }
</script>

<style scoped>

</style>
