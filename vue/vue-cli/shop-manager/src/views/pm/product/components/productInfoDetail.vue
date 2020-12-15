<template>
    <div style="margin-top: 50px">
        <el-form
                ref="productForm"
                :model="value"
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
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="value.name" ></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="subTitle">
                <el-input v-model="value.subTitle"></el-input>
            </el-form-item>
            <el-form-item label="商品货号：">
                <el-input v-model="value.productSn"></el-input>
            </el-form-item>
            <el-form-item label="市场价：">
                <el-input v-model="value.originalPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品售价：">
                <el-input v-model="value.price"></el-input>
            </el-form-item>
            <el-form-item label="商品库存:">
                <el-input v-model="value.store"></el-input>
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="value.sort"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="handleNext()">下一步，填写商品促销</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { getCategoryWithChildren } from "../../../../api/categoryApi"
    export default {
        name: "productInfoDetail",
        props:{
            value:Object, // value是一个商品的所有参数
        },
        data(){
            return{
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
                productCateValue:[],   // 代表你选中的分类数据
                productCateOptions:[], // 分类的数据
            }
        },
        watch:{
            productCateValue(newValue){
                // 点击了谁，就可以获取分类的ID，如果点击了一级分类，获取一个ID，如果点击了二级分类，获取2个ID
                if(newValue.length === 1){
                    // 点击了一级分类
                    this.value.productCategoryId = newValue[0];
                    this.value.productCategoryName = this.getCateNameById(this.value.productCategoryId)

                }else if(newValue.length === 2){
                    // 点击了二级分类
                    this.value.productCategoryId = newValue[1];
                    this.value.productCategoryName = this.getCateNameById(this.value.productCategoryId)
                }
            }
        },
        created() {
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
        methods:{
            // 根据ID获取分类的名字
            getCateNameById(id){
                // this.productCateOptions表示所有的分类数据
                let name = null;
                let pco = this.productCateOptions
                for(let i=0; i<pco.length; i++){
                    let children = pco[i].children;
                    if(children){
                        // 有二级分类
                        for(let j=0; j<pco[i].children.length; j++){
                            if (pco[i].children[j].value === id){
                                name = pco[i].children[j].label;
                                return name;
                            }
                        }
                    }else{
                        // 没有二级分类
                        if (pco[i].value === id){
                            name = pco[i].label;
                            return name;
                        }
                    }
                }
                return name;
            },
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
