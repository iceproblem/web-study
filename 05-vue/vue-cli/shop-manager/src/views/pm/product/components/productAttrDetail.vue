<template>
    <div style="margin-top: 50px;">
        <el-form
                ref="productCateForm"
                :model="value"
                label-width="150px"
                style="width: 800px"
        >
            <el-form-item label="商品相册: ">
                <!--uploadAction表示上传图片的接口地址-->
                <multi-upload
                    uploadAction="/manager/api/auth/product/upload_product"
                    v-model="dealProductPic"
                ></multi-upload>
            </el-form-item>
            <el-form-item label="商品详情页: ">
                <!--富文本编辑器插件：quill-editor-->
                <quill-editor
                        class="editor"
                        ref="phoneEditor"
                        v-model="value.detailHtml"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                />
            </el-form-item>
            <el-form-item style="margin-top: 120px">
                <el-button size="medium"  @click="handPrev">上一步，填写商品促销</el-button>
                <el-button type="primary" size="medium"  @click="handCommit">完成，提交商品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import MultiUpload from './../../../../components/upload/multiUpload'
    export default {
        name: "productAttrDetail",
        props:{
            value:Object, // value是一个商品的所有参数
            isUpdate:{
                type:Boolean,
                default:false, // false表示默认是添加，不是编辑
            }
        },
        data(){
            return {
                productAttr: {
                    productImgArr: []
                },
                content: '', // 详情页的内容
                editorOption: {
                    placeholder: '请输入商品的详情页...',
                }
            }
        },
        computed:{
            // dealProductPic(){  }  这样写表示只写get
            dealProductPic:{
                get(){  // 当使用计算属性时，就会走get
                    let pics = [];
                    // 验证主图
                    if(this.value.pic === null || this.value.pic === undefined || this.value.pic === ""){
                        return pics;
                    }
                    // 如果有主图
                    pics.push(this.value.pic)
                    // 验证图片集
                    if(this.value.albumPics === null || this.value.albumPics === undefined || this.value.albumPics === ""){
                        return pics;
                    }
                    // 有图片集
                    let albumPicArr = this.value.albumPics.split(",")
                    for(let i=0; i<albumPicArr.length; i++){
                        pics.push(albumPicArr[i])
                    }
                    return pics;
                },
                set(newValue){  // 当设置计算属性时，就走set
                    // console.log(newValue)
                    if(newValue == null || newValue.length == 0){
                        this.value.pic = null;
                        this.value.albumPics = null;
                    }else{
                        this.value.pic = newValue[0];
                        this.value.albumPics = '';
                        if(newValue.length > 1){
                            // 说明你不只选了一个图片
                            for(let i=1; i<newValue.length; i++){
                                this.value.albumPics += newValue[i]
                                if(newValue.length - 1 !== i){
                                    this.value.albumPics += ",";
                                }
                            }
                        }
                    }
                    // console.log("this.value.pic:",this.value.pic)
                    // console.log("this.value.albumPics:",this.value.albumPics)
                }
            }
        },
        methods:{
            handCommit(){
                this.$emit("finishCommit",this.isUpdate)
            },
            handPrev(){
                this.$emit("prevStep")
            },
            onEditorBlur(quill) {
                // console.log('editor blur!', quill);
                // console.log(this.content);
            },
            onEditorFocus(quill) {
                // console.log('editor focus!', quill)
            },
            onEditorReady(quill) {
                // console.log('editor ready!', quill)
            },
        },
        components: {
            MultiUpload
        }
    }
</script>

<style scoped lang="less">
    .editor{
        height: 300px;
    }
</style>
