<template>
    <div>
        <el-upload
                :action="uploadAction"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleUploadSuccess"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :limit="maxCount"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "multiUpload",
        props: {
            // 图片服务器地址
            uploadAction: {
                type: String,
                required: true
            },
            // 图片数组
            value: Array,
            // 最大的图片上传数量
            maxCount: {
                type: Number,
                default: 5
            }

        },
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: []
            };
        },
        created(){
            const productValue = this.value;
            if(productValue){
                for(let i=0; i<productValue.length; i++){
                    this.fileList.push({url: productValue[i]});
                }
            }
        },
        methods: {
            // 预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 上传成功
            handleUploadSuccess(response, file, fileList){
                this.fileList.push({url: "http://localhost:5000" + response.data.name});
                this.handleUpload(this.fileList);
            },
            // 删除
            handleRemove(file, fileList) {
                this.handleUpload(fileList);
            },
            // 超出最大数限制
            handleExceed(){
                this.$message({
                    message: `最多只能上传${this.maxCount}张图片`,
                    type: 'warning',
                    duration: 10000
                });
            },
            // 通知调用者
            handleUpload(fileList){
                let value = [];
                for(let i=0; i<fileList.length; i++){
                    value.push(fileList[i].url);
                }
                // 通过自定义事件返回给调用者
                this.$emit('input', value);
            }
        }
    }
</script>

<style scoped>

</style>
