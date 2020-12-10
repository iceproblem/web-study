<template>
  <el-container class="app-wrapper">
    <!-- 头部区域-->
    <NavBar></NavBar>
    <!--主体-->
    <el-container>
      <!--左侧-->
      <LeftAside :isCollapse="isCollapse"></LeftAside>
      <!--右侧-->
      <AppMain :toggleCollapse="toggleCollapse" :isCollapse="isCollapse"></AppMain>
    </el-container>
  </el-container>
</template>

<script>
// 引入组件
import NavBar from "./components/NavBar";
import LeftAside from "./components/LeftAside";
import AppMain from "./components/AppMain";
export default {
  name: "LayOut",
  data(){
    return {
      isCollapse: false
    }
  },
  methods:{
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    }
  },
  components:{
    NavBar,
    LeftAside,
    AppMain
  }
}
</script>

<style scoped lang="less">
.app-wrapper{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
