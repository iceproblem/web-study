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
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        align="center"
                        label="编号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="name"
                        align="center"
                        label="分类名称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="level"
                        align="center"
                        label="级别"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="productCount"
                        align="center"
                        label="商品数量"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="productUnit"
                        align="center"
                        label="数量单位"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="移动端显示"
                        width="100">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.showStatus"
                                active-color="1"
                                inactive-color="0">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sort"
                        align="center"
                        label="排序"
                        width="500">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="设置"
                        width="200">
                    <template slot-scope="scope">
                        <el-button size="mini">查看下一级</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        width="285">
                    <template slot-scope="scope">
                        <el-button size="mini">编辑</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
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
    export default {
        name: "index",
        data(){
            return{
                listData: [{
                    id: 1,
                    name: '安心蔬菜',
                    level:1,
                    productCount:100,
                    productUnit:"斤",
                    showStatus:1,
                    sort:1,
                },{
                    id: 2,
                    name: '豆制品',
                    level:1,
                    productCount:100,
                    productUnit:"袋",
                    showStatus:0,
                    sort:2,
                }]
            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
