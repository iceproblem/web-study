<template>
    <div>
        <!--头部区域-->
        <el-card class="operate-top-card" shadow="never">
            <i class="el-icon-s-order" style="font-size: 18px; margin-right: 3px;"></i>
            <span>左侧菜单列表</span>
        </el-card>
        <!--内容区域-->
        <div class="table-container">
            <el-table
                    :data="listData"
                    v-loading="listLoading"
                    border
                    style="width: 100%"
            >
                <el-table-column label="编号" width="120" align="center">
                    <template slot-scope="scope">{{(scope.$index + 1) + ((listQuery.pageNum-1)* listQuery.pageSize)}}</template>
                </el-table-column>
                <el-table-column label="菜单名称"  width="250" align="center">
                    <template slot-scope="scope">{{scope.row.title}}</template>
                </el-table-column>
                <el-table-column label="菜单级别"  width="250" align="center">
                    <template slot-scope="scope">{{scope.row.parentId | levelFilter}}</template>
                </el-table-column>
                <el-table-column label="菜单图标"  width="250" align="center">
                    <template slot-scope="scope">
                        <i :class="scope.row.icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                :disabled="scope.row.parentId | disableNextLevel"
                                @click="handleShowNextLevel(scope.$index, scope.row)"
                        >
                            查看下一级
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
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
</template>

<script>
    import {getLeftMenu} from './../../../api/adminApi'
    export default {
        name: "index",
        data(){
            return {
                listData: null,
                total: null,
                listLoading: false,
                listQuery: {
                    pageNum: 1,
                    pageSize: 5
                },
                parentId: 0
            }
        },
        created() {
            this.resetParentId();
            this.getList();
        },
        watch: {
            $route(route){
                this.resetParentId();
                this.getList();
            }
        },
        methods: {
            // 0. 重新设置父id
            resetParentId(){
                this.listQuery.pageNum = 1;
                if(this.$route.query.parentId !== undefined){
                    this.parentId = this.$route.query.parentId;
                }else {
                    this.parentId = 0;
                }
            },
            // 1. 获取列表
            getList(){
                this.listLoading = true;
                getLeftMenu(this.listQuery.pageNum, this.listQuery.pageSize, this.parentId).then((response)=>{
                    this.listLoading = false;
                    this.listData = response.data.list;
                    this.total = response.data.total;
                })
            },
            // 2. 查看下一级
            handleShowNextLevel(index, row){
                this.$router.push({path: '/um/menu', query: {parentId: row.id}})
            },
            // 3. 改变每页显示的条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageNum = 1;
                this.pageSize = val;
                // 重新加载数据
                this.getList();
            },
            // 4. 当前页码发生改变
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                // 重新加载数据
                this.getList();
            },
        },
        filters: {
            levelFilter(value){
                if(value === 0){
                    return '一级';
                }else {
                    return '二级';
                }
            },
            disableNextLevel(value){
                return value !== 0;
            }
        },

    }
</script>

<style scoped>

</style>
