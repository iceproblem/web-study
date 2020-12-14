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
            v-model="productObj"
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
    import productAttrDetail from '@/views/pm/product/components/productAttrDetail';

    //定义数据模型
    const defaultProductObj = {
        // 商品信息
        productCategoryId:null, // 商品分类ID
        produceCategoryName:"", // 商品分类的名称
        name:"", // 商品名称
        subTitle:"", // 商品的副标题
        productIntor:"", //商品介绍
        productSn:"", // 商品的货号
        originalPrice:"", // 市场价
        price:"", //商品售价
        store:"", // 商品库存
        sort:"", // 排序

        // 商品属性
        giftScore: null,    //赠送积分
        giftGrow: null,     //赠送成长值
        publishStatus: 1, // 是否上架
        newsStatus: 1,  //是否新品
        recommendStatus: 1,     // 是否推荐
        serviceList: '', // 服务列表
        netContent: '',     // 净含量
        storageCondition: '',   // 保存条件
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
        productHomeKillList: [   // 限时抢购
            {count: 0, discount: 0}
        ],

        // 商品详情
        productAttr: {
            productImgArr: []
        },
        content: '', // 详情页的内容
        pic:"", // 商品主图片
        albumPics:"", // 商品的图片集
        detailHtml:"",  // 详情页

    }

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
                showStatus:[true,false,false],
                productObj:Object.assign({},defaultProductObj)  // 商品的参数

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