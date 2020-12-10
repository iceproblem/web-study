<template lang="">
    <el-card class="form-container" shadow="never">
        <!--步骤条-->
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="填写商品信息"></el-step>
            <el-step title="填写商品促销"></el-step>
            <el-step title="填写商品属性"></el-step>
        </el-steps>
        <productInfoDetail
            v-show="showStatus[0]"
            @nextStep="nextStep"
        ></productInfoDetail>
        <productSaleDetail
            v-show="showStatus[1]"
            @nextStep="nextStep"
            @prevStep="prevStep"
        ></productSaleDetail>
        <productAttrDetail
            v-show="showStatus[2]"
            @prevStep="prevStep"
            @finishCommit="finishCommit"
        ></productAttrDetail>
    </el-card>
</template>
<script>
import productInfoDetail from '@/views/pm/product/components/productInfoDetail';
import productSaleDetail from '@/views/pm/product/components/productSaleDetail';
import productAttrDetail from '@/views/pm/product/components/productAttrDetail'
export default {
    name:"productDetail",
    components:{
        productInfoDetail,
        productSaleDetail,
        productAttrDetail
    },
    data(){
        return{
            active:0,
            showStatus:[true,false,false]
        }
    },
    methods:{
        hideAll(){
            for(let i = 0; i<this.showStatus.length;i++){
                this.showStatus[i] = false;
            }
        },
        // 下一步
            nextStep(){
                if(this.active < this.showStatus.length-1){
                    this.active++
                    this.hideAll();
                    this.showStatus[this.active] = true;
                }
            },
            // 上一步
            prevStep(){
                if(this.active >0) {
                    this.active--
                    this.hideAll();
                    this.showStatus[this.active] = true;
                }
            },
            // 完成
            finishCommit(){
                this.$message.success("提交商品成功")
            }
    }
}
</script>
<style lang="">
    
</style>