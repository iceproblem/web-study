<template>
  <div id="dash-board">
    <router-view></router-view>
    <div class="bottom">
      <router-link class="item" to="/home/index">首页</router-link>
      <router-link class="item" to="/home/about">关于</router-link>
      <router-link class="item" to="/home/mine">我的</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
  }
}
</script>

<!--scoped表示当前写的样式，只针对当前组件的模块，如果没有scoped，你写的样式，就可能作用于别的组件中-->
<style scoped>
#dash-board{
  width: 400px;
  height: 600px;
  margin: 0 auto;
  background-color: silver;
  position: relative;
}
.bottom{
  width: 100%;
  height: 44px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
