<template>
    <el-upload
            class="upload-single"
            :action="uploadAction"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            list-type="picture"
            :multiple="false"
            :limit="1"
    >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
    export default {
        name: "singleUpload",
        props:{
            uploadAction:{  // 上传图片的地址
                type:String,
                required:true
            },
            successCallBack:{  // 上传图片成功的回调函数
                type:Function,
                required:true
            }
        },
        data() {
            return {
                fileList: []
            };
        },
        methods: {
            handleSuccess(response){ // 当图片上传成功后，调用此访问
                // console.log(response,file, fileList);
                if(response.status===1){
                    this.successCallBack(response.data);
                }
            },
            handleRemove(file, fileList) {// 当移除组件时调用
                if(file.status === "success"){
                    this.successCallBack(null);
                }
            }
        }
    }
</script>

<style scoped>

</style>
