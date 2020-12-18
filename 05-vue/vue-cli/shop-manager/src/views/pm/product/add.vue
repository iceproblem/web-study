<template>
    <div>
        <el-card class="box-card" shadow="naver">
            <i class="el-icon-s-order" style="font-size:18px; margin-right:5px;"></i>
            <span>添加商品</span>
        </el-card>
        <productDetail></productDetail>
    </div>
</template>

<script>
    import productDetail from '@/views/pm/product/components/productDetail'
    export default {
        name: "add",
        components:{
            productDetail
        }
    }
</script>

<style scoped>

</style>
