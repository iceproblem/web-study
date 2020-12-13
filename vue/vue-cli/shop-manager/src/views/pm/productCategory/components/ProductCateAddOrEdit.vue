<template>
    <div>
        <el-card class="box-card" shadow="never">
            <i class="el-icon-s-order" style="font-size: 18px; margin-right: 5px;"></i>
            <span>添加商品分类</span>
            <el-button class="btn-back" size="mini" @click="$router.back()">返回</el-button>
        </el-card>
        <el-card class="form-container" shadow="never">
            <el-form
                ref="productCateForm"
                :model="productCate"
                label-width="150px"
                :rules="rules"
            >
                <el-form-item label="分类名称：" prop="name">
                    <el-input v-model="productCate.name"></el-input>
                </el-form-item>
                <el-form-item label="上级分类：">
                    <el-select v-model="productCate.parent_id" placeholder="请选择上级分类">
                        <el-option
                                v-for="item in selectProductCateList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据单位：">
                    <el-input v-model="productCate.product_unit"></el-input>
                </el-form-item>
                <el-form-item label="排序：">
                    <el-input v-model="productCate.sort"></el-input>
                </el-form-item>
                <el-form-item label="分类是否启用：">
                    <el-radio-group v-model="productCate.nav_status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="移动端是否显示：">
                    <el-radio-group v-model="productCate.show_status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="分类图标：">
                    <!--图片上传接口 /manager/api/auth/category/upload_category-->
                    <SingleUpload
                        uploadAction="/manager/api/auth/category/upload_category"
                        :successCallBack="getCategoryIcon"
                    ></SingleUpload>
                </el-form-item>
                <el-form-item label="关键字：">
                    <el-input v-model="productCate.keywords"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model="productCate.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('productCateForm')">提交</el-button>
                    <el-button type="danger" @click="onReset('productCateForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import SingleUpload from "../../../../components/upload/SingleUpload";
    import { getCategory,addCategory,getCategoryId } from "../../../../api/categoryApi"

    let defaultProductCate = {
        parent_id:0, // 上一级分类的ID  0代表一级分类
        name:"", // 分类的名字
        product_unit:"", // 数量单位
        sort:0, // 分类的排序
        nav_status:0, // 分类是否启用
        show_status:0, // 在移动端是否显示
        icon:"", // 分类图标
        keywords:"", // 关键字
        description:"", // 分类的描述
    }

    export default {
        name: "ProductCateAddOrEdit",
        props:{
            isUpdate:{
                //根据isUpdate来确定是编辑还是添加，true变表示编辑，false表示添加
                type:Boolean,
                default:false
            }

        },
        data(){
            return{
                productCate:Object.assign({},defaultProductCate),
                // 上级分类数组
                selectProductCateList:[],
                // 检验的规则
                rules:{
                    name:[
                        {required:true,message:"请输入分类名称",trigger:"blur"},
                        {min:3,max:20,message:"长度在3到20个字符",trigger:"blur"}
                    ]
                }
            }
        },
        created() {
            if(this.isUpdate){
                //编辑
                getCategoryId(this.$route.query.id).then(response=>{
                    if(response.status === 1){
                        this.productCate = response.data[0]
                    }
                })
            }else{
                //添加
                this.productCate = Object.assign({},defaultProductCate)
            }
            this.getProductCategoryList();
        },
        methods:{
            // 获取分类列表
            getProductCategoryList(){
                getCategory(0, 1,100).then(response=>{
                    // console.log(response)
                    if(response.status === 1){
                        this.selectProductCateList = response.data.category_list
                        this.selectProductCateList.unshift({id:0,name:"无上级分类"})
                    }
                })
            },
            // 上传图片后的回调函数
            getCategoryIcon(data){  // 图片上传的回调函数
                if(data === null){
                    // 删除上传的图片了
                    this.productCate.icon = null;
                    return
                }
                // 图片上传成功
                console.log("data:",data); // 图片上传成功后，服务器响应的data
                this.productCate.icon = data.name
            },
            // 实现分类的上传
            onSubmit(forName){
                this.$refs[forName].validate(valid=>{
                    if(valid){
                        // 检验通过  发起ajax请求
                        addCategory(this.productCate).then(response=>{
                            // console.log(response)
                            if(response.status === 1){
                                // 清空表单
                                this.onReset(forName);
                                // 提示用户
                                this.$message({
                                    type:"success",
                                    message:response.msg,
                                    duration:1000
                                })
                            }else{
                                // 提示用户
                                this.$message({
                                    type:"error",
                                    message:response.msg,
                                    duration:1000
                                })
                            }
                        })
                    }else{
                        // 检验不通过
                        this.$message({
                            type:"error",
                            message:"分类名称不能为空",
                            duration:1000
                        })
                        return false;
                    }
                });
            },
            // 实现重置
            onReset(forName){
                this.$refs[forName].resetFields();
                this.productCate = Object.assign({},defaultProductCate)
                this.getProductCategoryList();
            }
        },
        components:{
            SingleUpload
        }
    }
</script>

<style scoped lang="less">
    .btn-back{
        float: right;
    }
</style>
