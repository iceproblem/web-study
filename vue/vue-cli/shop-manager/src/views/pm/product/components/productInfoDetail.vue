<template>
    <div style="margin-top: 50px">
        <el-form
                ref="productForm"
                :model="productInfo"
                label-width="150px"
                :rules="productInfoRules"
                style="width: 600px"
        >
            <el-form-item label="商品分类：">
                <el-cascader
                    v-model="productCateValue"
                    :options="productCateOptions"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleProductCateChange"></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称：" prop="name">
                <el-input v-model="productInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="副标题：" prop="subTitle">
                <el-input v-model="productInfo.subTitle"></el-input>
            </el-form-item>
            <el-form-item label="商品货号：">
                <el-input v-model="productInfo.productSn"></el-input>
            </el-form-item>
            <el-form-item label="市场价：">
                <el-input v-model="productInfo.originalPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品售价：">
                <el-input v-model="productInfo.price"></el-input>
            </el-form-item>
            <el-form-item label="商品库存：">
                <el-input v-model="productInfo.store"></el-input>
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="productInfo.sort"></el-input>
            </el-form-item>
        </el-form>

        <el-button size="medium" type="primary" @click="handleNext()">下一步，填写商品促销</el-button>
    </div>
</template>

<script>
    export default {
        name: "productInfoDetail",
        data(){
            return{
                productInfo:{
                    name:"", // 商品名称
                    subTitle:"", // 商品的副标题
                    productSn:"", // 商品的货号
                    originalPrice:"", // 市场价
                    price:"", //商品售价
                    store:"", // 商品库存
                    sort:"", // 排序
                },
                productInfoRules:{
                    name:[
                        {required:true,message:"请输入商品的名称",trigger:"blur"},
                        {min:3,max:50,message:"长度在3到50个字符",trigger:"blur"},
                    ],
                    subTitle:[
                        {required:true,message:"请输入商品的副标题",trigger:"blur"},
                        {min:3,max:50,message:"长度在3到50个字符",trigger:"blur"},
                    ]
                },
                productCateValue:[],
                productCateOptions:[
                    {
                        value:"1",
                        label:"安心蔬菜",
                        children:[
                            {
                                value:"1-1",
                                label:"新品上线"
                            },
                            {
                                value:"1-2",
                                label:"平价"
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            handleNext(){
                this.$emit("nextStep")
            },
            handleProductCateChange(value){
                console.log(value)
            }
        }
    }
</script>

<style scoped>

</style>
