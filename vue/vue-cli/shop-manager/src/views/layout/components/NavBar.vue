<template>
  <el-header class="el-header">
    <div>
      <img width="60" src="../../../assets/images/logo.png" alt="">
      <h2>后台管理系统小案例</h2>
    </div>
    <el-button type="danger" @click="logout">退出</el-button>
  </el-header>
</template>

<script>
import {checkLogout} from '../../../api/adminApi'
export default {
  name: "NavBar",
  methods:{
      async logout(){
          let result = await checkLogout()
          // console.log(result)
          if(result.status !== 1) return this.$message.error(result.msg);
          // 退出登录成功
          this.$message.success(result.msg)
          // 清空sessionStorage中token
          window.sessionStorage.removeItem("token")
          // 路由跳转
          this.$router.push("/login")
      }
  }

}
</script>

<style scoped lang="less">
.el-header{
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div{
    display: flex;
    align-items: center;
    margin-right: 15px;
    h2{
      margin-left: 20px;
    }
  }
}
</style>