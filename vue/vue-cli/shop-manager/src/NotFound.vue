<template>
  <div class="app-container">
    <el-col :span="12">
      <img :src="img_404" alt="" class="img-style">
    </el-col>
    <el-col :span="12">
      <div style="margin-left: 100px; margin-top: 60px;">
        <h1>oh! no~</h1>
        <h2>很抱歉，你的页面走丢了！</h2>
        <div>请检查你输入的网址是否正确，或点击返回按钮！</div>
        <el-button type="danger round" style="margin-top: 20px" @click="goMainPage">返回首页</el-button>
      </div>
    </el-col>
  </div>
</template>

<script>
import img_404 from "@/assets/images/gif_404.gif"
export default {
  name: "NotFound",
  data(){
    return{
      img_404
    }
  },
  methods:{
    goMainPage(){
      console.log(".....")
      this.$router.replace({path:"/"})
    }
  }
}
</script>

<style scoped lang="less">
.app-container{
  width: 80%;
  margin: 120px auto;
  .img-style{
    width: 100%;
    height: 100%;
  }
}
</style>
