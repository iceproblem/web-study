<template>
  <el-main>
    <span
        class="icon iconfont icon-hamburger"
        @click="toggleAsideBar"
        :class="{'is-collapse':isCollapse}"
    ></span>
    <!--路由的出口-->
    <router-view></router-view>
  </el-main>
</template>

<script>
export default {
  name: "AppMain",
  props:{
    toggleCollapse:{
      type:Function
    },
    isCollapse:{
      type:Boolean
    }
  },
  methods:{
    toggleAsideBar(){
      this.toggleCollapse();
    }
  }
}
</script>

<style scoped lang="less">
.el-main{
  position: relative;
  padding: 60px;
}
.icon-hamburger{
  font-size: 25px;
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
  transition: .2s;
}
.is-collapse{
  transform: rotate(-90deg);
}
</style>