<template>
  <div id="home">
    home板块
    <!--路由的导航-->
    <ul>
      <li><router-link to="/home/news">新闻</router-link></li>
      <li><router-link to="/home/shop">商品</router-link></li>
    </ul>
    <!--路由的出口-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {

  }
}
</script>

<style scoped>
#home{
  width: 500px;
  height: 500px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #ffffff;
  margin: 50px auto;
}
</style>