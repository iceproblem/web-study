<template>
    <div class="app-container">
        <!-- 筛选搜索区域 -->
        <el-card shadow="never" class="operate-top-card">
            <div>
                <i class="el-icon-search" style="font-size: 18px; margin-right: 4px;"></i>
                <span>筛选搜索</span>
                <el-button class="btn-clear" size="mini" style="float:right;" @click="handleResetSearch">清空</el-button>
                <el-button class="btn-find" size="mini" type="primary" style="float: right; margin-right: 10px"  @click="handleSearchList">查询订单</el-button>
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
                        border
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
                        <template slot-scope="scope">{{ (scope.$index+1) + ((listQuery.pageNum-1) * listQuery.pageSize) }}</template>
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
                        <template slot-scope="scope">{{ scope.row.payType | formatPayType }}</template>
                    </el-table-column>
                    <el-table-column
                            label="订单来源"
                            align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.sourceType | formatSourceType }}</template>
                    </el-table-column>
                    <el-table-column
                            label="订单状态"
                            align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.status | formatStatusType }}</template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="200"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleLookOrder(scope.$index,scope.row)">查看订单</el-button>
                           <!-- 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单-->
                            <el-button
                                    size="mini"
                                    type="danger"
                                    v-show="scope.row.status === 0"
                                    @click="handleCloseOrder(scope.$index,scope.row)"
                            >关闭订单</el-button>
                            <el-button
                                    size="mini"
                                    type="warning"
                                    v-show="scope.row.status === 1"
                                    @click="handleDeliveryOrder(scope.$index,scope.row)"
                            >订单发货</el-button>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    v-show="scope.row.status === 2 || scope.row.status === 3"
                                    @click="handleLookLogistics(scope.$index,scope.row)"
                            >订单跟踪</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    v-show="scope.row.status === 4"
                                    @click="handleDeleteOrder(scope.$index,scope.row)"
                            >删除订单</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
           <!-- 批量-->
            <div class="many-operate-container">
                <el-select placeholder="批量操作列表" v-model="operatesType"  size="small">
                    <el-option
                            v-for="item in operatesOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button size="mini" type="danger" style="margin-left: 10px" @click="handleManyOperate">确定</el-button>
            </div>
            <!-- 分类列表的分页区域 -->
            <div class="pagination-container">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="listQuery.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="listQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>

        <!--物流跟踪面板-->
        <LogisticsDialog v-model="logisticsDialogVisible"></LogisticsDialog>
        <!--关闭订单面板-->
        <el-dialog
            title="关闭订单"
            :visible="closeOrder.dialogVisible"
            :before-close="handleClose"
            width="30%"
        >
            <div>
                <el-input
                    v-model="closeOrder.content"
                    placeholder="请输入关闭订单的原因"
                    :row="5"
                    type="textarea"
                ></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeOrder.dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleCloseOrderConfim">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { getOrderList,closeOrder,deleteOrder } from "../../api/orderApi"
    import LogisticsDialog from "./components/logisticsDialog"
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
                listQuery: Object.assign({},defaultListQuery),
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
                listLoading:false, // 表格中加载数据时的loading效果
                list:[],  // 列表中的数据
                operatesOptions:[   // 批量选择的选择项
                    {label:"批量发货",value:1},
                    {label:"关闭订单",value:2},
                    {label:"删除订单",value:3},
                ],
                operatesType:"",  // 批量选择中的选中的数据
                total:null, // 总记录数
                logisticsDialogVisible:false, // 物流面板的显示或隐藏
                closeOrder:{
                    dialogVisible:false, // 关闭订单的面板的显示或隐藏
                    content:null, // 关闭订单的理由
                    orderIds:[]
                },
                multipleSelection:[], // 选择的订单数据
            }
        },
        created() {
            this.getList();  // 获取订单数据
        },
        methods:{
            // 清空搜索列表
            handleResetSearch(){
                this.listQuery = Object.assign({},defaultListQuery)
                this.getList();
            },
            // 查询订单
            handleSearchList(){
                this.listQuery.pageNum = 1;
                this.getList();
            },
            // 获取订单数据
            async getList(){
                let result = await getOrderList(this.listQuery);
                // console.log(result)
                if(result.status === 1){
                    this.list = result.data.list;
                    this.total = result.data.total;
                }
            },
            // 改变每页显示的条数
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                // 重新加载数据
                this.getList();
            },
            // 切换页码
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                // 重新加载数据
                this.getList();
            },
            // 批量选择
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            // 查看订单
            handleLookOrder(index,row){
                this.$router.push({
                    path:"/om/detail",
                    query:{id:row.id}
                })
            },
            // 关闭订单（对闭关订单的面板操作）
            handleCloseOrder(index,row){
                this.closeOrder.dialogVisible = true;
                this.closeOrder.orderIds = [row.id]
            },
            // 点击关闭订单面板上的小叉
            handleClose(){
                this.closeOrder.dialogVisible = false;
            },
            // 确认关闭订单
            handleCloseOrderConfim(){
                if(this.closeOrder.content === null || this.closeOrder.content === ""){
                    this.$message.warning("关闭订单的理由不能为空！")
                    return;
                }
                // 发起关闭订单的ajax请求
                closeOrder({ids:this.closeOrder.orderIds, note:this.closeOrder.content}).then(response=>{
                    // console.log(response)
                    if(response.status === 1){
                        // 清空所要关闭的订单的id
                        this.closeOrder.orderIds = [];
                        // 隐藏面板
                        this.closeOrder.dialogVisible = false;
                        // 请求列表数据
                        this.getList();
                        this.$message.success("关闭订单成功了！")
                    }
                }).catch(err=>{
                    this.$message.error(err.msg)
                })
            },
            // 订单发货
            handleDeliveryOrder(index,row){
                let listItem = this.dealProductOrder(row);
                this.$router.push({
                    path: '/om/deliver',
                    query: {listData: [listItem]}
                })
            },
            // 处理发货的接受数据
            dealProductOrder(order){
                return {
                    orderId: order.id,
                    orderSn: order.orderSn,
                    receiverName: order.receiverName,
                    receiverPhone: order.receiverPhone,
                    receiverPostCode: order.receiverPostCode,
                    address: order.receiverProvince + order.receiverCity + order.receiverRegion + order.receiverDetailAddress,
                    deliveryCompany: null,
                    deliverySn: null
                }
            },
            // 订单跟踪
            handleLookLogistics(index,row){
                this.logisticsDialogVisible = true;
            },
            // 订单删除
            handleDeleteOrder(index,row){
                let ids = [];
                ids.push(row.id)
                this.deleteOrder(ids)
            },
            deleteOrder(ids){
                this.$confirm("此操作将永久删除改订单，是否继续？","提示",{
                    confirmButtonText:"确定",
                    cancelButtonText:"取消",
                    type:"warning"
                }).then(()=>{
                    // 要删除订单
                    deleteOrder({ids}).then(response=>{
                        if(response.status === 1){
                            this.$message.success("删除订单成功");
                            this.getList();
                        }
                    }).catch(err=>{
                        this.$message.success(err.msg)
                    })
                })
            },
            // 批量处理
            handleManyOperate(){
                if(this.multipleSelection === null || this.multipleSelection.length < 1){
                    this.$message.warning("请选择要批量操作的订单！")
                    return
                }
                if(!this.operatesType){
                    this.$message.warning("请选择要批量操作的选项")
                    return
                }

                if(this.operatesType === 1){
                    let list = [];
                    // 批量发货
                    for(let i=0; i<this.multipleSelection.length; i++){
                        let order = this.multipleSelection[i];
                        if(order.status === 1){
                            list.push(this.dealProductOrder(order))
                        }
                    }
                    if(list.length === 0){
                        this.$message.warning("选中的订单中没有要进行发货的")
                        return;
                    }
                    this.$router.push({
                        path: '/om/deliver',
                        query: {listData: list}
                    })
                }else if(this.operatesType === 2){
                    // 批量关闭订单
                    // 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单
                    for(let i=0; i<this.multipleSelection.length; i++){
                        let order = this.multipleSelection[i];
                        if(order.status !== 4){
                            this.closeOrder.orderIds.push(order.id)
                        }
                    }
                    this.closeOrder.dialogVisible = true;
                }else if(this.operatesType === 3){
                    // 批量删除订单
                    let ids = [];
                    for(let i=0; i<this.multipleSelection.length; i++){
                        let order = this.multipleSelection[i];
                        ids.push(order.id)
                    }
                    this.deleteOrder(ids)
                }
            }
        },
        filters:{
            formatPayType(value){
                if(value === 1){
                    return "支付宝"
                }else if(value === 2){
                    return "微信"
                }else{
                    return "未支付"
                }
            },
            formatSourceType(value){
                if(value === 0){
                    return "PC端订单"
                }else if(value === 1){
                    return "APP订单"
                }else{
                    return "其它订单"
                }
            },
            formatStatusType(value){
                if(value === 0){
                    return "待付款"
                }else if(value === 1){
                    return "待发货"
                }else if(value === 2){
                    return "已发货"
                }else if(value === 3){
                    return "已完成"
                }else if(value === 4){
                    return "已关闭"
                }else if(value === 5){
                    return "无效订单"
                }
            }
        },
        components:{
            LogisticsDialog
        }
    }
</script>

<style scoped>

</style>
