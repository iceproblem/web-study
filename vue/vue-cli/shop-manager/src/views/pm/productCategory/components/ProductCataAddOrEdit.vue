<template>
    <div>
        <!-- 头部区域 -->
        <el-card class="box-card" shadow="never">
            <i class="el-icon-s-order" style="font-size: 18px; margin-right: 5px;"></i>
            <span>添加商品分类</span>
            <el-button class="btn-back" type="danger" size="mini" @click="$router.back()">返回</el-button>
        </el-card>
        <!-- 表单区域 -->
        <el-card class="form-container" shadow="never">
            <el-form
                ref="productCateForm"
                :model="productCate"
                label-width="150px"
            >
                <el-form-item label="分类名称">
                    <el-input v-model="productCate.name"></el-input>
                </el-form-item>
                <el-form-item label="上级分类">
                    <el-input v-model="productCate.parentId" placeholder="请选择上级分类"></el-input>
                    <el-option
                        v-for="item in selectProcuctCateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-form-item>
                <el-form-item label="数据单位">
                    <el-input v-model="productCate.productUnit"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="productCate.sort"></el-input>
                </el-form-item>
                <el-form-item label="移动端是否显示">
                    <el-radio-group v-model="productCate.showStatus">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="分类图标：">
                    <SingleUpload></SingleUpload>
                </el-form-item>
                <el-form-item label="关键字：">
                    <el-input v-model="productCate.keywords"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model="productCate.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">提交</el-button>
                    <el-button type="danger">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import SingleUpload from '@/components/upload/SingleUpload'
export default {
    name:"ProductCataAddOrEdit",
    data(){
        return{
            productCate:{
                name:"",
                parentId:"",
                productUnit:"",
                sort:0,
                showStatus:0,
                icon:"",
                keywords:"",
                description:"",
            },
            //上级分类分组
            selectProcuctCateList:[
                {id:0,name:"无上级分类"},
                {id:1,name:"新鲜蔬菜"},
                {id:2,name:"豆制品"}
            ]
        }
    },
    components:{
        SingleUpload
    }
}
</script>

<style scoped>
    .btn-back{
        float: right;
    }
</style>