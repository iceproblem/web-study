<template>
    <div style="margin-top: 50px">
        <el-form
                ref="productCateForm"
                :model="productSale"
                label-width="150px"
                style="width: 600px"
        >
            <el-form-item label="赠送积分：" prop="giftScore">
                <el-input v-model="productSale.giftScore" ></el-input>
            </el-form-item>
            <el-form-item label="赠送成长值：" prop="giftGrow">
                <el-input v-model="productSale.giftGrow" ></el-input>
            </el-form-item>
            <el-form-item label="商品上架：" prop="delivery">
                <el-switch
                        v-model="productSale.publishStatus"
                        :active-value="1"
                        :inactive-value="0"
                >
                </el-switch>
            </el-form-item>
            <el-form-item label="商品推荐：" prop="delivery">
                <span style="margin-right: 10px;">新品</span>
                <el-switch
                        v-model="productSale.newsStatus"
                        :active-value="1"
                        :inactive-value="0"
                />
                <span style="margin-right: 10px; margin-left: 10px;">推荐</span>
                <el-switch
                        v-model="productSale.recommendStatus"
                        :active-value="1"
                        :inactive-value="0"
                />
            </el-form-item>
            <el-form-item label="服务保证: " prop="type">
                <el-checkbox-group v-model="productSale.serviceList">
                    <el-checkbox :label="1">1小时达</el-checkbox>
                    <el-checkbox :label="2">满60免运费</el-checkbox>
                    <el-checkbox :label="3">无忧退款</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="净含量：">
                <el-input v-model="productSale.netContent" ></el-input>
            </el-form-item>
            <el-form-item label="保存条件：">
                <el-input v-model="productSale.storageCondition" ></el-input>
            </el-form-item>
            <el-form-item label="保质期：">
                <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入商品备注"
                        v-model="productSale.quality">
                </el-input>
            </el-form-item>
            <el-form-item label="选择优惠方式：">
                <el-radio-group v-model="productSale.reductionType">
                    <el-radio-button :label="0">无优惠</el-radio-button>
                    <el-radio-button :label="1">特惠促销</el-radio-button>
                    <el-radio-button :label="2">会员优惠</el-radio-button>
                    <el-radio-button :label="3">限时抢购</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-show="productSale.reductionType === 1">
                <div>
                    开始时间:
                    <el-date-picker
                            v-model="productSale.reductionStartTime"
                            align="right"
                            type="datetime"
                            placeholder="选择特惠开始的时间"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div style="margin-top: 10px;">
                    结束时间:
                    <el-date-picker
                            v-model="productSale.reductionStartTime"
                            align="right"
                            type="datetime"
                            placeholder="选择特惠结束的时间"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div style="margin-top: 10px;">
                    促销价格:
                    <el-input style="width: 220px;" v-model="productSale.reductionPrice" placeholder="输入促销价格"></el-input>
                </div>
            </el-form-item>
            <el-form-item v-show="productSale.reductionType === 2">
                <div v-for="(item, index) in productSale.memberPriceList" :key="index" style="margin-top: 10px;">
                    {{item.memberLevelName}}:
                    <el-input v-model="item.memberPrice" style="width: 200px;"></el-input>
                </div>
            </el-form-item>
            <el-form-item v-show="productSale.reductionType === 3">
                <el-table
                        :data="productSale.productHomeKillList"
                        border
                        style="width: 80%">
                    <el-table-column
                            align="center"
                            label="数量"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.count"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="折扣"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.discount"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleAddHomeKill(scope.$index, scope.row)">添加</el-button>
                            <el-button type="text" @click="handleRemoveHomeKill(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" @click="handPrev">上一步, 填写商品信息</el-button>
                <el-button type="primary" size="medium" @click="handNext">下一步, 填写商品属性</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "productSaleDetail",
        data(){
            return {
                productSale: {
                    giftScore: null,
                    giftGrow: null,
                    publishStatus: 1, // 是否上架
                    newsStatus: 1,
                    recommendStatus: 1,
                    serviceList: [1, 2], // 服务列表
                    netContent: '',
                    storageCondition: '',
                    quality: '',
                    reductionType: 0, // 优惠选项
                    reductionPrice: 0, // 促销价格
                    reductionStartTime: null, //特惠开始时间
                    reductionEndTime: null, //特惠结束时间
                    // 会员体系价格
                    memberPriceList: [
                        {
                            id: 1,
                            memberLevelName: '黄金会员',
                            memberPrice: null
                        },
                        {
                            id: 2,
                            memberLevelName: '白金会员',
                            memberPrice: null
                        },{
                            id: 3,
                            memberLevelName: '钻石会员',
                            memberPrice: null
                        }
                    ],
                    // 首页秒杀
                    productHomeKillList: [
                        {count: 0, discount: 0}
                    ]
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                }
            }
        },
        methods:{
            handNext(){
                this.$emit("nextStep")
            },
            handPrev(){
                this.$emit("prevStep")
            },
            // 添加一个首页秒杀方案
            handleAddHomeKill(index, row){
                // 1. 获取数据
                let productHomeKillList = this.productSale.productHomeKillList;
                // 2. 判断
                if(productHomeKillList.length < 1){
                    productHomeKillList.push({
                        count: 0, discount: 0
                    })
                }else {
                    this.$message({
                        message: '首页秒杀方案只能有1种',
                        type: 'warning'
                    });
                }
                console.log(index, row);
            },
            // 移除一个首页秒杀方案
            handleRemoveHomeKill(index, row){
                // 1. 获取数据
                let productHomeKillList = this.productSale.productHomeKillList;
                productHomeKillList.pop();
                productHomeKillList.push({
                    count: 0, discount: 0
                });
                /*
                if(productHomeKillList.length === 1){
                    productHomeKillList.pop();
                    productHomeKillList.push({
                        count: 0, discount: 0
                    });
                }else {
                    productHomeKillList.splice(index, 1);
                }
                */
                console.log(index, row);
            }
        }
    }
</script>

<style scoped>

</style>
