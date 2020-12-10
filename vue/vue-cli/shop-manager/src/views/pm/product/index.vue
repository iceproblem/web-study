<template>
    <div class="app-container">
        <!-- 筛选搜索区域 -->
        <el-card shadow="never">
            <div>
                <i class="el-icon-search" style="font-size: 18px; margin-right: 4px;"></i>
                <span>筛选搜索</span>
                <el-button class="btn-clear" size="mini" type="danger" style="float: right;">清空</el-button>
                <el-button class="btn-find" size="mini" type="primary" style="float: right; margin-right: 10px;">查询</el-button>
            </div>
            <div style="margin-top: 50px">
                <el-form
                        ref="productCateForm"
                        :model="listQuery"
                        label-width="150px"
                        :inline="true"
                >
                    <el-form-item label="商品货号：">
                        <el-input v-model="listQuery.productSn" style="width: 180px;"></el-input>
                    </el-form-item>
                    <el-form-item label="商品所属分类：">
                        <el-select v-model="listQuery.productCateValue" placeholder="请选择"  style="width: 150px;">
                            <el-option
                                    v-for="item in selectProductCateList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上架状态：">
                        <el-select v-model="listQuery.publishStatus" placeholder="请选择商品是否上架"  style="width: 150px;">
                            <el-option
                                    v-for="item in publishStatusOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称：">
                        <el-input v-model="listQuery.productName"  placeholder="请输入商品名称" style="width: 350px;"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!--表头和表格区域-->
        <div>
            <!--头部区域-->
            <el-card shadow="never">
                <i class="el-icon-s-order" style="font-size: 18px; margin-right: 4px;"></i>
                <span>商品列表</span>
                <el-button class="btn-add" type="primary" size="mini" style="float: right;">添加</el-button>
            </el-card>
            <!--内容区域-->
            <div class="table-container">
                <el-table
                    ref="multipleTable"
                    :data="listData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    height="300"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            label="编号"
                            width="100"
                            align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.id }}</template>
                    </el-table-column>
                    <el-table-column
                            label="商品图片"
                            width="160"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <img :src="scope.row.pic" alt="" style="width: 80px;height: 80px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="商品名称"
                            width="200"
                            align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                            label="价格/货号"
                            width="180"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <p>市场价：{{ scope.row.price }}</p>
                            <p>货号：{{ scope.row.productSn }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="180"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <p>上架：<el-switch :active-value="scope.row.publishStatus" :inactive-value="0"></el-switch></p>
                            <p>新品：<el-switch :active-value="scope.row.newsStatus" :inactive-value="1"></el-switch></p>
                            <p>推荐：<el-switch :active-value="scope.row.recommendStatus" :inactive-value="0"></el-switch></p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="销量"
                            width="100"
                            align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.sale }}</template>
                    </el-table-column>
                    <el-table-column
                            label="存量"
                            width="100"
                            align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.count }}</template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150"
                            align="center"
                    >
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
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                listQuery:{
                    productSn:"",  // 商品的货号
                    productCateValue:null, // 商品的分类
                    publishStatus:1, // 上架的状态
                    productName:"", // 商品名称
                },
                selectProductCateList:[  // 商品的分类
                    {id:0, name:"无上级分类"},
                    {id:1, name:"安心蔬菜"},
                    {id:2, name:"豆制品"},
                ],
                publishStatusOptions:[
                    {value:1,label:"上架"},
                    {value:0,label:"下架"},
                ],
                listData:[  // 表格中的数据
                    {
                        id:1, // 编号
                        pic:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073133910,2363541116&fm=26&gp=0.jpg", // 商品图片
                        name:"饼干10袋，200g",  // 商品名称
                        price:9.9,   // 市场价
                        productSn:"MM0001",  // 货号
                        publishStatus:1,  // 是否上架
                        newsStatus:1,    // 是否是新品
                        recommentStatus:1, // 是否推荐
                        sale:1000, // 销量
                        count:10000, // 存量
                    },
                    {
                        id:1, // 编号
                        pic:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073133910,2363541116&fm=26&gp=0.jpg", // 商品图片
                        name:"饼干10袋，200g",  // 商品名称
                        price:9.9,   // 市场价
                        productSn:"MM0001",  // 货号
                        publishStatus:1,  // 是否上架
                        newsStatus:1,    // 是否是新品
                        recommentStatus:1, // 是否推荐
                        sale:1000, // 销量
                        count:10000, // 存量
                    },
                    {
                        id:1, // 编号
                        pic:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073133910,2363541116&fm=26&gp=0.jpg", // 商品图片
                        name:"饼干10袋，200g",  // 商品名称
                        price:9.9,   // 市场价
                        productSn:"MM0001",  // 货号
                        publishStatus:1,  // 是否上架
                        newsStatus:1,    // 是否是新品
                        recommentStatus:1, // 是否推荐
                        sale:1000, // 销量
                        count:10000, // 存量
                    },
                    {
                        id:1, // 编号
                        pic:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073133910,2363541116&fm=26&gp=0.jpg", // 商品图片
                        name:"饼干10袋，200g",  // 商品名称
                        price:9.9,   // 市场价
                        productSn:"MM0001",  // 货号
                        publishStatus:1,  // 是否上架
                        newsStatus:1,    // 是否是新品
                        recommentStatus:1, // 是否推荐
                        sale:1000, // 销量
                        count:10000, // 存量
                    },
                    {
                        id:1, // 编号
                        pic:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073133910,2363541116&fm=26&gp=0.jpg", // 商品图片
                        name:"饼干10袋，200g",  // 商品名称
                        price:9.9,   // 市场价
                        productSn:"MM0001",  // 货号
                        publishStatus:1,  // 是否上架
                        newsStatus:1,    // 是否是新品
                        recommentStatus:1, // 是否推荐
                        sale:1000, // 销量
                        count:10000, // 存量
                    },
                    {
                        id:1, // 编号
                        pic:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073133910,2363541116&fm=26&gp=0.jpg", // 商品图片
                        name:"饼干10袋，200g",  // 商品名称
                        price:9.9,   // 市场价
                        productSn:"MM0001",  // 货号
                        publishStatus:1,  // 是否上架
                        newsStatus:1,    // 是否是新品
                        recommentStatus:1, // 是否推荐
                        sale:1000, // 销量
                        count:10000, // 存量
                    },
                    {
                        id:1, // 编号
                        pic:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073133910,2363541116&fm=26&gp=0.jpg", // 商品图片
                        name:"饼干10袋，200g",  // 商品名称
                        price:9.9,   // 市场价
                        productSn:"MM0001",  // 货号
                        publishStatus:1,  // 是否上架
                        newsStatus:1,    // 是否是新品
                        recommentStatus:1, // 是否推荐
                        sale:1000, // 销量
                        count:10000, // 存量
                    },
                    {
                        id:1, // 编号
                        pic:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073133910,2363541116&fm=26&gp=0.jpg", // 商品图片
                        name:"饼干10袋，200g",  // 商品名称
                        price:9.9,   // 市场价
                        productSn:"MM0001",  // 货号
                        publishStatus:1,  // 是否上架
                        newsStatus:1,    // 是否是新品
                        recommentStatus:1, // 是否推荐
                        sale:1000, // 销量
                        count:10000, // 存量
                    },
                    {
                        id:1, // 编号
                        pic:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073133910,2363541116&fm=26&gp=0.jpg", // 商品图片
                        name:"饼干10袋，200g",  // 商品名称
                        price:9.9,   // 市场价
                        productSn:"MM0001",  // 货号
                        publishStatus:1,  // 是否上架
                        newsStatus:1,    // 是否是新品
                        recommentStatus:1, // 是否推荐
                        sale:1000, // 销量
                        count:10000, // 存量
                    },
                    {
                        id:1, // 编号
                        pic:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073133910,2363541116&fm=26&gp=0.jpg", // 商品图片
                        name:"饼干10袋，200g",  // 商品名称
                        price:9.9,   // 市场价
                        productSn:"MM0001",  // 货号
                        publishStatus:1,  // 是否上架
                        newsStatus:1,    // 是否是新品
                        recommentStatus:1, // 是否推荐
                        sale:1000, // 销量
                        count:10000, // 存量
                    }
                ]
            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>

</style>
