<template>
    <div>
        <!-- 分类列表的头部区域 -->
        <el-card class="box-card" shadow="never">
            <i class="el-icon-s-order" style="font-size: 18px; margin-right: 5px;"></i>
            <span>商品分类列表</span>
            <el-button class="btn-add" type="primary" size="mini" @click="$router.push('/pm/productCateAdd')">添加</el-button>
        </el-card>
        <!-- 分类列表的表格区域 -->
        <div class="table-container">
            <el-table
                    :data="listData"
                    border
                    v-loading="listLoading"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        label="编号"
                        width="100">
                        <template slot-scope="scope">{{ scope.$index+1}}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="分类名称"
                        width="100">
                        <template slot-scope="scope">{{ scope.row.name}}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="级别"
                        width="100">
                        <template slot-scope="scope">{{ scope.row.parent_id}}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="商品数量"
                        width="100">
                        <template slot-scope="scope">{{ scope.row.product_count}}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="数量单位"
                        width="100">
                        <template slot-scope="scope">{{ scope.row.product_unit}}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="移动端显示"
                        width="100">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleNavStatusChange(scope.$index,scope.row)"
                            v-model="scope.row.nav_status"
                            active-color="1"
                            inactive-color="0">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="是否启用"
                        width="100">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleShowStatusChange(scope.$index,scope.row)"
                            v-model="scope.row.show_status"
                            active-color="1"
                            inactive-color="0">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="排序"
                        width="500">
                        <template slot-scope="scope">{{ scope.row.sort}}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="设置"
                        width="200">
                    <template slot-scope="scope">
                        <el-button 
                            size="mini"
                            @click="handleShowNextLevel(scope.$index,scope.row)"
                            :disabled="scope.row.parent_id | disableNextLevel"
                        >查看下一级</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        width="285">
                    <template slot-scope="scope">
                        <el-button 
                            size="mini"
                            @click="handleUpdate(scope.$index,scope.row)"
                            >编辑</el-button>
                        <el-button 
                            size="mini" 
                            type="danger"
                            @click="handleDelete(scope.$index,scope.row)"
                            >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分类列表的分页区域 -->
        <div class="pagination-container">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="5"
                    :page-sizes="[5,10,15]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getCategory } from '../../../api/categoryApi';
    export default {
        name: "index",
        data(){
            return{
                listData: null,
                listLoading:false,
                parentId:0, //父分类的id
                pageNum:1,  //  表示当前是第几页
                pageSize:5, //每页显示多少数据
                total:0,   //统计分类的数量
            }
        },
        created() {
            this.getList(); //在发送ajax请求之前，先把loading变成true
        },
        methods:{
            getList(){
                this.listLoading = true;
                getCategory(this.parentId,this.pageNum,this.pageSize).then(response=>{
                // console.log(response)
                if(response.data.status = 1){
                    this.listLoading = false;
                    this.listData = response.data.category_list;
                    this.total = response.data.category_count;
                }
            })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 控制移动端是否显示
            handleNavStatusChange(){
                updateCategory({id:row.id,nav_status: row.nav_status}).then(response=>{
                    // console.log(response)
                    if(response.status === 1){
                        this.$message.success(response.msg)
                    }else{
                        this.$message.error(response.msg)
                    }
                })
            },
            // 控制分类是否启用
            handleShowStatusChange(){

            },
            // 查看二级分类
            handleShowNextLevel(){

            },
            // 编辑
            handleUpdate(){

            },
            // 删除
            handleDelete(){

            }
        },
        filters:{
            levelFilter(value){
                if(value === 0){
                    return "一级"
                }else{
                    return "二级"
                }
            },
            disableNextLevel(value){
                return value !==0
            }
        }
    }
</script>

<style scoped lang="less">
    .btn-add{
        float: right;
    }
    .table-container{
        margin-top: 20px;
    }
</style>
