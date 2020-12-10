<template>
  <div id="app">
    <h1>App组件</h1>
    <router-link to="/home">首页</router-link>
    <router-link to="/about/110">关于</router-link>
    <router-link to="/mine/wc/18/man">我的</router-link>

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="less">
#app{
  text-align: center;
  color: skyblue;
  margin-top: 60px;
}
</style>
