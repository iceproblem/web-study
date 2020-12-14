<template>
    <div class="app-container">
        <!-- 筛选搜索区域 -->
        <el-card shadow="never">
            <div>
                <i class="el-icon-search" style="font-size: 18px; margin-right: 4px;"></i>
                <span>筛选搜索</span>
                <el-button class="btn-clear" size="mini" style="float: right;">清空</el-button>
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
                        <el-cascader
                                v-model="productCateValue"
                                :options="productCateOptions"
                                :props="{ expandTrigger: 'hover' }"
                                @change="handleProductCateChange"></el-cascader>
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
                        <el-input v-model="listQuery.name"  placeholder="请输入商品名称" style="width: 350px;"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!--表头和表格区域-->
        <div>
            <!--头部区域-->
            <el-card shadow="never" style="margin-top: 30px">
                <i class="el-icon-s-order" style="font-size: 18px; margin-right: 4px;"></i>
                <span>商品列表</span>
                <el-button class="btn-add" size="mini" style="float: right;">添加</el-button>
            </el-card>
            <!--内容区域-->
            <div class="table-container">
                <el-table
                    ref="multipleTable"
                    :data="listData"
                    v-loading="listLoading"
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
                        :current-page="listQuery.pageNum"
                        :page-sizes="[5,10,15]"
                        :page-size="listQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { getProductList } from "../../../api/productApi"
    import { getCategoryWithChildren } from "../../../api/categoryApi"
    let defautlQuery = {
        productSn:null, // 商品货号
        productCategoryId:null, // 商品所属分类
        publishStatus:null, // 上架状态
        name:null, // 商品名称
        pageNum:1, // 默认显示第几页面
        pageSize:5, // 每页显示多少个
    }
    export default {
        name: "index",
        data(){
            return{
                listQuery:Object.assign({},defautlQuery),
                productCateValue:[],  // 选中分类的数据
                productCateOptions:[], // 分类列表
                selectProductCateList:[  // 商品的分类
                    {id:0, name:"无上级分类"},
                    {id:1, name:"安心蔬菜"},
                    {id:2, name:"豆制品"},
                ],
                publishStatusOptions:[
                    {value:1,label:"上架"},
                    {value:0,label:"下架"},
                ],
                listLoading:false, // ajax请求数据的Loading
                listData:[], // 表格中的数据
                total:0, // 总数据条数

            }
        },
        created() {
              // 获取商品的分类数据
              this.getCategoryList();
              // 获取商品的列表数据
              this.getList();
        },
        watch:{
            productCateValue(newValue){
                // 点击了谁，就可以获取分类的ID，如果点击了一级分类，获取一个ID，如果点击了二级分类，获取2个ID
                if(newValue.length === 1){
                    // 点击了一级分类
                    this.listQuery.productCategoryId = newValue[0];

                }else if(newValue.length === 2){
                    // 点击了二级分类
                    this.listQuery.productCategoryId = newValue[1];
                }else{
                    this.listQuery.productCategoryId = null;
                }
            }
        },
        methods:{
            getCategoryList(){  // 获取商品的分类数据
                getCategoryWithChildren().then(response=>{
                    // console.log(response)
                    if(response.status === 1){
                        let listArr = response.data;
                        this.productCateOptions = [];
                        // this.productCateOptions = listArr;
                        // 把后端响应的数据结构转化成我们需要的数据结构
                        for(let i=0; i<listArr.length; i++){
                            let children = [];
                            if(listArr[i].children != null && listArr[i].children.length>0){
                                // 有二级分类
                                for(let j=0; j<listArr[i].children.length; j++){
                                    children.push({value:listArr[i].children[j].id,label:listArr[i].children[j].name})
                                }
                            }
                            children = children.length > 0 ? children :null
                            // 没有二级分类
                            this.productCateOptions.push({
                                label:listArr[i].name,
                                value:listArr[i].id,
                                children:children
                            })
                        }
                        // console.log(this.productCateOptions)
                    }
                })
            },
            // ajax获取商品列表
            getList(){
                this.listLoading = true;
                getProductList(this.listQuery).then(response=>{
                    console.log(response)
                    if(response.status === 1){
                        this.listLoading = false;
                        this.listData = response.data.product_list;
                        this.total= response.data.product_count;
                    }
                })
            },
            handleSizeChange(val) { // 每页多少条
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList(); // 重新加载数据
            },
            handleCurrentChange(val) {  // 点击切换页面
                this.listQuery.pageNum = val;
                this.getList(); // 重新加载数据
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleProductCateChange(value){
                console.log(value)
            }
        }
    }
</script>

<style scoped>

</style>
