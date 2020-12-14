<template>
    <el-card class="form-container" shadow="never">
        <!--步骤条-->
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="填写商品信息"></el-step>
            <el-step title="填写商品促销"></el-step>
            <el-step title="填写商品属性"></el-step>
        </el-steps>
       <!-- 在组件上面，写了一个v-model也相当于写了一个:value和@input-->
        <productInfoDetail
            v-show="showStatus[0]"
            v-model="productObj"
            @nextStep="nextStep"
        ></productInfoDetail>
        <productSaleDetail
            v-show="showStatus[1]"
            v-model="productObj"
            @nextStep="nextStep"
            @prevStep="prevStep"
        ></productSaleDetail>
        <productAttrDetail
            v-show="showStatus[2]"
            v-model="productObj"
            @prevStep="prevStep"
            @finishCommit="finishCommit"
        ></productAttrDetail>
    </el-card>

</template>

<script>
    import { addProduct } from "../../../../api/productApi"
    import productInfoDetail from "./productInfoDetail";
    import productSaleDetail from "./productSaleDetail";
    import productAttrDetail from "./productAttrDetail";

    // 定义数据模型  表示一个商品
    const defaultProductObj = {
        productCategoryId:null, // 商品分类ID
        productCategoryName:"", // 商品分类名字
        name: '',  // 商品名称
        subTitle: '',  // 副标题
        productIntro: '', // 商品介绍
        productSn: '', // 商品货号
        originalPrice: null, // 市场价
        price: null, // 商品售价
        store: null,  // 商品库存
        sort: null, // 排序
        giftScore: null,  // 赠送积分
        giftGrow: null,  // 赠送成长值
        publishStatus: 1, // 是否上架
        newsStatus: 1,  // 是否新品
        recommendStatus: 1,  // 是否推荐
        serviceIds: '', // 服务列表
        netContent: '',  // 净含量
        storageCondition: '', // 储存条件
        quality: '',    // 保质期
        reductionType: 0, // 优惠选项
        reductionPrice: 0, // 促销价格
        reductionStartTime: null, //特惠开始时间
        reductionEndTime: null, //特惠结束时间
        memberPriceList: [  // 会员体系价格
            {
                memberLevelId: 1,
                memberLevelName: '黄金会员',
                memberPrice: null
            },
            {
                memberLevelId: 2,
                memberLevelName: '白金会员',
                memberPrice: null
            },{
                memberLevelId: 3,
                memberLevelName: '钻石会员',
                memberPrice: null
            }
        ],
        productHomeKillList: [ // 首页秒杀
            {count: 0, discount: 0}
        ],
        productAttr: {
            productImgArr: []
        },
        pic:"", // 商品主图片
        albumPics:"", // 商品的图片集
        content: '', // 详情页的内容
        detailHtml:"", // 详情页
    }

    export default {
        name: "productDetail",
        data() {
            return {
                active: 0,
                showStatus:[true,false,false],
                productObj:Object.assign({},defaultProductObj) // 商品的参数
            };
        },
        methods:{
            // 隐藏下面的三个组件
            hideAll(){
                for(let i=0; i<this.showStatus.length; i++){
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
                this.$confirm("是否创建一个新的商品","xxx温馨提示",{
                    confirmButtonText:"确定",
                    cancelButtonText:"取消"
                }).then(()=>{
                    // 点击确定，完成商品的添加
                    addProduct(this.productObj).then(response=>{
                        if(response.status == 1){
                            this.$message.success(response.msg)
                            location.reload(); // 重新加载页面  相当于刷新
                        }else{
                            this.$message.error(response.msg)
                        }
                    })
                }).catch(()=>{
                    this.$message.info("已取消")
                })
            }
        },
        components:{
            productInfoDetail,
            productSaleDetail,
            productAttrDetail
        }
    }
</script>

<style scoped>

</style>
