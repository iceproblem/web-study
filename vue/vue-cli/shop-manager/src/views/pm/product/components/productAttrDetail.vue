<template>
    <div style="margin-top: 50px;">
        <el-form
                ref="productCateForm"
                :model="productAttr"
                label-width="150px"
                style="width: 800px"
        >
            <el-form-item label="商品相册: ">
                <multi-upload></multi-upload>
            </el-form-item>
            <el-form-item label="商品详情页: ">
                <quill-editor
                        class="editor"
                        ref="phoneEditor"
                        v-model="content"
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
        methods:{
            handCommit(){
                this.$emit("finishCommit")
            },
            handPrev(){
                this.$emit("prevStep")
            },
            onEditorBlur(quill) {
                console.log('editor blur!', quill);
                console.log(this.content);
            },
            onEditorFocus(quill) {
                console.log('editor focus!', quill)
            },
            onEditorReady(quill) {
                console.log('editor ready!', quill)
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
